import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SubscribeUser from "./modules/account/SubscribeUser";
import { LoginView } from "./modules/user/LoginView";
import { MeView } from "./modules/user/MeView";
import { RegisterView } from "./modules/user/RegisterView";

export class Router extends React.PureComponent {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/me" component={MeView} />
          <Route path="/subscription" component={SubscribeUser} />
        </Switch>
      </BrowserRouter>
    );
  }
}
