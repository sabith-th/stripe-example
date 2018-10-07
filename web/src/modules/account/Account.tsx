import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { meQuery } from "../../graphql/queries/me";
import { MeQuery } from "../../schemaTypes";
import SubscribeUser from "./SubscribeUser";

export class Account extends React.PureComponent {
  public render() {
    return (
      <Query<MeQuery> query={meQuery}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }
          if (!data) {
            return <div>Data is undefined</div>;
          }
          if (!data.me) {
            return <Redirect to="/login" />;
          }
          if (data.me.type === "free-trial") {
            return <SubscribeUser />;
          }
          return <div>Your current subscription plan: {data.me.type}</div>;
        }}
      </Query>
    );
  }
}
