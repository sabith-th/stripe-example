import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { Router } from "./Routes";

ReactDOM.render(<Router />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
