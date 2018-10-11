import { gql } from "apollo-boost";
import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";
import { Form } from "./Form";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
        {mutate => (
          <Form
            buttonText="Register"
            onSubmit={async data => {
              await mutate({
                variables: data
              });
              this.props.history.push("/login");
            }}
          />
        )}
      </Mutation>
    );
  }
}
