import { gql } from "apollo-boost";
import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { userFragment } from "src/graphql/fragments/userFragment";
import { meQuery } from "../../graphql/queries/me";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";
import { Form } from "./Form";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserInfo
    }
  }
  ${userFragment}
`;

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <Mutation<LoginMutation, LoginMutationVariables>
        update={(cache, { data }) => {
          if (!data || !data.login) {
            return;
          }
          cache.writeQuery({
            data: { me: data.login },
            query: meQuery
          });
        }}
        mutation={loginMutation}
      >
        {(mutate, { client }) => (
          <Form
            buttonText="Login"
            onSubmit={async data => {
              await client.resetStore();
              await mutate({
                variables: data
              });
              this.props.history.push("/account");
            }}
          />
        )}
      </Mutation>
    );
  }
}
