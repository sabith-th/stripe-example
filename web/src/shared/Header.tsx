import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { meQuery } from "../graphql/queries/me";
import { MeQuery } from "../schemaTypes";

export class Header extends React.PureComponent {
  public render() {
    return (
      <div
        style={{
          backgroundColor: "#fafafa",
          display: "flex",
          height: 50,
          justifyContent: "space-around",
          padding: 10,
          width: "100%"
        }}
      >
        <Link to="/">
          <h2>Stripe Example</h2>
        </Link>
        <Query<MeQuery> query={meQuery}>
          {({ data, loading }) => {
            if (loading || !data) {
              return null;
            }

            if (!data.me) {
              return (
                <div>
                  <div>
                    <Link to="/login">Login</Link>
                  </div>
                  <div>
                    <Link to="/register">Register</Link>
                  </div>
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
