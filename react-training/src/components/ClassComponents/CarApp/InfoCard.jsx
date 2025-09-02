import { Component, PureComponent } from "react";
import myPureComponent from "./myPureComponent"
// PureComponent: implement a default shouldComponentUpdate method

// stateless component: do not manage state internally, only receive props

class InfoCard extends myPureComponent {
  render() {
    const { make, quantity, id } = this.props.car;

    console.log(`${make} rendered`);
    return (
      <div
        style={{
          width: "150px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          border: "1px solid black",
          padding: "15px",
        }}
      >
        <div>{make}</div>
        <div>{quantity}</div>
        <button onClick={() => this.props.handleSell(id)}>Sell</button>
      </div>
    );
  }

  // shouldComponentUpdate(nextProps) {
  //   if (this.props.car === nextProps.car) {
  //     return false;
  //   }
  //   return true;
  // }
}

export default InfoCard;
