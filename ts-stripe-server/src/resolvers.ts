import * as bcrypt from "bcryptjs";
import { IResolvers } from "graphql-tools";
import { User } from "./entity/User";
import { stripe } from "./stripe";

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }
      return await User.findOne({ where: { id: req.session.userId } });
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ email, password: hashedPassword }).save();
      return true;
    },
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }
      req.session.userId = user.id;
      return user;
    },
    createSubscription: async (_, { source }, { req }) => {
      if (!req.session || !req.session.userId) {
        throw new Error("Not Authenticated");
      }

      const user = await User.findOne(req.session.userId);
      if (!user) {
        throw new Error("User not found");
      }

      const customer = await stripe.customers.create({
        email: user.email,
        source,
        plan: process.env.PLAN_ID
      });

      user.stripeId = customer.id;
      user.type = "standard";
      user.save();

      return user;
    }
  }
};
