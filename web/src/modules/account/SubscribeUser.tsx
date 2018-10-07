import { gql } from "apollo-boost";
import * as React from "react";
import { Mutation } from "react-apollo";
import StripeCheckout from "react-stripe-checkout";
import {
  CreateSubscriptionMutation,
  CreateSubscriptionMutationVariables
} from "../../schemaTypes";

const createSubscriptionMutation = gql`
  mutation CreateSubscriptionMutation($source: String!) {
    createSubscription(source: $source) {
      id
      email
      type
    }
  }
`;
export default class SubscribeUser extends React.PureComponent {
  public render() {
    return (
      <Mutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>
        mutation={createSubscriptionMutation}
      >
        {mutate => (
          <StripeCheckout
            // tslint:disable-next-line:jsx-no-lambda
            token={async token => {
              mutate({ variables: { source: token.id } });
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!}
          />
        )}
      </Mutation>
    );
  }
}
