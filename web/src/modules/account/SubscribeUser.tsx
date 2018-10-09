import { gql } from "apollo-boost";
import * as React from "react";
import { Mutation } from "react-apollo";
import StripeCheckout from "react-stripe-checkout";
import { userFragment } from "src/graphql/fragments/userFragment";
import {
  CreateSubscriptionMutation,
  CreateSubscriptionMutationVariables
} from "../../schemaTypes";

const createSubscriptionMutation = gql`
  mutation CreateSubscriptionMutation($source: String!, $ccLast4: String!) {
    createSubscription(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }
  ${userFragment}
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
              mutate({
                variables: { source: token.id, ccLast4: token.card.last4 }
              });
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!}
            amount={1000}
          />
        )}
      </Mutation>
    );
  }
}
