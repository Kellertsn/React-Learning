import React from "react";
import InfoCard from "./InfoCard";

const mockCarData = [
  {
    make: "Toyota",
    quantity: 10,
    id: 1,
    date: new Date(),
  },
  {
    make: "Honda",
    quantity: 10,
    id: 2,
  },
  {
    make: "Nissan",
    quantity: 10,
    id: 3,
  },
];

// CarApp

/**
 * mock data
 * make
 * quantity
 * id
 *
 * display the car info in a card
 * button, to sell a car
 */

class CarApp extends React.Component {
  // constructor(props){
  //   super(props)

  // }

  state = {
    cars: [...mockCarData],
  };

  handleSell = (id) => {
    const updatedCars = this.state.cars.map((car) => {
      if (car.id === id) {
        return { ...car, quantity: car.quantity - 1 };
      }
      return car;
    });

    this.setState({
      cars: updatedCars,
    });
  };

  render() {
    // console.log("car data", this.state.cars);
    // const newObj = JSON.parse(JSON.stringify(this.state.cars));
    // console.log("newObj", newObj);
    return (
      <>
        <h3>Car App</h3>

        <ul style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {this.state.cars.map((car) => (
            <InfoCard key={car.id} car={car} handleSell={this.handleSell} />
          ))}
        </ul>
      </>
    );
  }
}

export default CarApp;
