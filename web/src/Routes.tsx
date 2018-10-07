import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Account } from "./modules/account/Account";
import { LoginView } from "./modules/user/LoginView";
import { RegisterView } from "./modules/user/RegisterView";
import { Header } from "./shared/Header";

export class Router extends React.PureComponent {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route
            path="/"
            render={() => (
              <React.Fragment>
                <Header />
                <div>
                  <Route path="/register" component={RegisterView} />
                  <Route path="/account" component={Account} />
                  <Route path="/" exact={true} component={HomePage} />
                </div>
              </React.Fragment>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
