import React from "react";

class myPureComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.car !== nextProps.car ? true : false;
  }
}

export default myPureComponent;


// structureClone(obj)
// object.assign
// concat

