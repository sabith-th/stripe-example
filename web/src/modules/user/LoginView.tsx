import { gql } from "apollo-boost";
import * as React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export class LoginView extends React.PureComponent<RouteComponentProps<{}>> {
  public state = {
    email: "",
    password: ""
  };
  public render() {
    const { email, password } = this.state;
    return (
      <Mutation<LoginMutation, LoginMutationVariables> mutation={loginMutation}>
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
                this.props.history.push("/me");
              }}
            >
              Login
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
