import React from 'react';

const withCounter = (WrappedComponent) => {//add counter related logic to the component
    return class NewComponent extends React.Component {
        state = {
            counter:0
        }

        handleIncrement = () => {
            this.setState({
                counter: this.state.counter + 1,
            })
        }

        handleDecrement = () => {
            this.setState({
                counter: this.state.counter - 1,
            })
        }
        render() {
            return <WrappedComponent counter={this.state.counter} handleIncrement={this.handleIncrement} handleDecrement={this.handleDecrement} {...this.props}/>
        }
    }
}

export default withCounter