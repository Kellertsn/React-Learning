import React from "react";

class ClassDemo extends React.Component {
  // constructor(props) {
  //   super(props);

  //   console.log("props", this.props);

  //   this.state = {
  //     counter: 0,
  //   };

  //   // this.handleAdd = this.handleAdd.bind(this);
  // }

  // shorthand way to initialize component state
  state = {
    counter: 0,
    timer: 0,
  };

  // arrow function automatically bind this context
  handleAdd = () => {
    // console.log("this", this);
    // console.log("setState", this.setState);
    // this.setState({
    //   counter: this.state.counter + 1, // 0 + 1
    // });
    // this.setState({
    //   counter: this.state.counter + 1, // 0 + 1
    // });

    this.setState((prev) => {
      return {
        counter: prev.counter + 1, // 0 + 1
      };
    });
    this.setState((prev) => {
      return {
        counter: prev.counter + 1, // 1 + 1
      };
    });
  };

  render() {
    console.log("render");
    const root = document.querySelector("#root");
    console.log("root", root);
    return (
      <div>
        <h3>Class Counter Demo</h3>
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.handleAdd}>Add 2 to counter</button>
        <p>Timer: {this.state.timer}</p>
        <ChildComponent name={"alice"} />
      </div>
    );
  }

  componentDidMount() {
    console.log("componentDidMount");
    const btn = document.querySelector("#toggle-btn");
    console.log("btn", btn);

    // this.intervalId = setInterval(() => {
    //   console.log("timer is running");
    //   this.setState({
    //     timer: this.state.timer + 1,
    //   });
    // }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    console.log(prevState, this.state);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // clearInterval(this.intervalId);
  }
}

export default ClassDemo;

// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   greeting() {
//     console.log("My name is", this.name);
//   }
// }

// const p1 = new Person("Alice");
// p1.greeting();

// const hello = p1.greeting;

// console.log(this);
// hello();

class ChildComponent extends React.Component {
  render() {
    console.log("ChildComponent render");
    return <div>{this.props.name}</div>;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("props", this.props === nextProps);
  //   console.log("state", this.state === nextState);

  //   if (this.props.name === nextProps.name && this.state === nextState) {
  //     return false;
  //   }
  //   return true;
  // }
}