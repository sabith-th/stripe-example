import * as React from "react";
import { Input } from "../../ui/Input";
import { RedButton } from "../../ui/RedButton";

interface IState {
  email: string;
  password: string;
}
interface IProps {
  onSubmit: (data: IState) => void;
  buttonText: string;
}

export class Form extends React.PureComponent<IProps, IState> {
  public state = {
    email: "",
    password: ""
  };

  public render() {
    const { email, password } = this.state;
    const { buttonText } = this.props;
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={this.handleChange}
            label="EMAIL"
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={password}
            onChange={this.handleChange}
            label="PASSWORD"
          />
        </div>
        <div>
          <RedButton onClick={() => this.props.onSubmit(this.state)}>
            {buttonText}
          </RedButton>
        </div>
      </div>
    );
  }

  private handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    } as any);
  };
}
