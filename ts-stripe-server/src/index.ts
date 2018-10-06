import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import * as express from "express";
import * as session from "express-session";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req })
  });

  await createConnection();

  const app = express();
  app.use(
    session({
      secret: "thetragedyofdarthplagueis",
      resave: false,
      saveUninitialized: false
    })
  );

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000"
    }
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
