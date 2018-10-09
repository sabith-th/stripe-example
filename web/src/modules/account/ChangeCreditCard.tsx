import { gql } from "apollo-boost";
import * as React from "react";
import { Mutation } from "react-apollo";
import StripeCheckout from "react-stripe-checkout";
import { userFragment } from "src/graphql/fragments/userFragment";
import {
  ChangeCreditCardMutation,
  ChangeCreditCardMutationVariables
} from "../../schemaTypes";

const changeCreditCardMutation = gql`
  mutation ChangeCreditCardMutation($source: String!, $ccLast4: String!) {
    changeCreditCard(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export default class ChangeCreditCard extends React.PureComponent {
  public render() {
    return (
      <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>
        mutation={changeCreditCardMutation}
      >
        {mutate => (
          <StripeCheckout
            // tslint:disable-next-line:jsx-no-lambda
            token={async token => {
              mutate({
                variables: { source: token.id, ccLast4: token.card.last4 }
              });
            }}
            panelLabel="Change Card"
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!}
          >
            <button>Change Credit Card</button>
          </StripeCheckout>
        )}
      </Mutation>
    );
  }
}
