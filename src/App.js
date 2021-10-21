import React from "react";
import TopBar from "./components/TopBar";
import Forecast from "./components/Forecast";
import "./styles.css";

class App extends React.Component {
  state = {
    location: {
      lat: null,
      long: null,
    },
  };

  componentDidMount() {
    console.log("In componentDidMount");
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            long: position.coords.latitude,
          },
        });
      },
      (err) => console.log(err)
    );
  }

  render() {
    return (
      <div className="ui container">
        <TopBar loc={this.state.location} />
        <Forecast location={this.state.location} />
      </div>
    );
  }
}

export default App;
