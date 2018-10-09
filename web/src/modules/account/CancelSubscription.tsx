import { gql } from "apollo-boost";
import * as React from "react";
import { Mutation } from "react-apollo";
import { userFragment } from "src/graphql/fragments/userFragment";
import { CancelSubscriptionMutation } from "src/schemaTypes";

const cancelSubscriptionMutation = gql`
  mutation CancelSubscriptionMutation {
    cancelSubscription {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export class CancelSubscription extends React.PureComponent {
  public render() {
    return (
      <Mutation<CancelSubscriptionMutation>
        mutation={cancelSubscriptionMutation}
      >
        {mutate => (
          <button onClick={() => mutate()}>Cancel Subscription</button>
        )}
      </Mutation>
    );
  }
}
