import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { HeaderButton } from "src/ui/HeaderButton";
import { meQuery } from "../graphql/queries/me";
import { MeQuery } from "../schemaTypes";

export class Header extends React.PureComponent {
  public render() {
    return (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "rgb(255, 254, 252)",
          display: "flex",
          height: 50,
          justifyContent: "space-around",
          padding: 10,
          width: "100%"
        }}
      >
        <Link to="/">
          <HeaderButton style={{ fontSize: 24 }}>Stripe Example</HeaderButton>
        </Link>
        <Query<MeQuery> query={meQuery}>
          {({ data, loading }) => {
            if (loading || !data) {
              return null;
            }

            if (!data.me) {
              return (
                <div>
                  <Link to="/login">
                    <HeaderButton>Login</HeaderButton>
                  </Link>
                  <Link to="/register">
                    <HeaderButton>Register</HeaderButton>
                  </Link>
                </div>
              );
            }

            return (
              <div>
                <Link to="/account">Account</Link>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
