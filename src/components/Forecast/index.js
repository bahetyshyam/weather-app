import React from "react";
import TodaysWeather from "./TodaysWeather";
import WeekWeather from "./WeekWeather";

class Forecast extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <div className="ui stackable grid">
        <TodaysWeather location={location} />
        <WeekWeather location={location} />
      </div>
    );
  }
}

export default Forecast;
