import React from "react";
import weatherAPI from "../../../api/weatherAPI";
import TodaysWeatherDetails from "./TodaysWeatherDetails";

class TodaysWeather extends React.Component {
  state = {
    today: undefined,
  };

  getCurrentWeather = async () => {
    const { location } = this.props;
    if (location.lat !== null) {
      const response = await weatherAPI.get("/weather", {
        params: {
          lat: location.lat,
          lon: location.long,
          APPID: process.env.REACT_APP_WEATHER_API_KEY,
          units: "metric",
        },
      });
      const responseData = response.data;
      this.setState({
        today: {
          mainText: responseData.weather[0].main,
          desc: responseData.weather[0].description,
          temp: responseData.main.temp,
          moreInfo: {
            htemp: responseData.main.temp_max,
            ltemp: responseData.main.temp_min,
            pressure: responseData.main.pressure,
            humidity: responseData.main.humidity,
          },
        },
      });
    }
  };

  componentDidUpdate = async () => {
    if (!this.state.today) await this.getCurrentWeather();
  };

  renderCardContent = () => {
    const { today } = this.state;
    const { mainText, desc, temp } = today;
    return (
      <div className="content">
        <div className="header card-header">
          <i className="sun icon"></i>
          &nbsp; Today's Weather
        </div>
        <div className="ui grid">
          <div className="ten wide column">
            <h3>{mainText}</h3>
            <p>
              {desc.replace(/\w+/g, function (w) {
                return w[0].toUpperCase() + w.slice(1).toLowerCase();
              })}
            </p>
          </div>
          <div className="six wide column">
            <h2>{temp}&#8451;</h2>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { today } = this.state;
    return (
      <div className="six wide column">
        <div className="ui card todays-weather-card">
          {today ? this.renderCardContent() : "Loading"}
          <TodaysWeatherDetails todaysWeather={this.state.today} />
        </div>
      </div>
    );
  }
}

export default TodaysWeather;
