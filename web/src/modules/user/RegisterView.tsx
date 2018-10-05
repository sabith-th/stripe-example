import { gql } from "apollo-boost";
import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

export class RegisterView extends React.PureComponent<RouteComponentProps<{}>> {
  public state = {
    email: "",
    password: ""
  };
  public render() {
    const { email, password } = this.state;
    return (
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
        {mutate => (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={this.handleChange}
            />
            <button
              // tslint:disable-next-line:jsx-no-lambda
              onClick={async () => {
                await mutate({
                  variables: { email, password }
                });
                this.props.history.push("/login");
              }}
            >
              Register
            </button>
          </div>
        )}
      </Mutation>
    );
  }

  private handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
}
