import React from "react";
import weatherAPI from "../../api/weatherAPI";

class WeekWeather extends React.Component {
  state = {
    weeksWeather: undefined,
  };

  getWeeksWeather = async () => {
    const { location } = this.props;
    const response = await weatherAPI.get("/forecast", {
      params: {
        lat: location.lat,
        lon: location.long,
        units: "metric",
        APPID: process.env.REACT_APP_WEATHER_API_KEY,
      },
    });
    const responseData = response.data;
    let weeksWeather = [];
    for (const [index, dayForecast] of responseData.list.entries()) {
      if (index % 8 === 0) {
        const desc = dayForecast.weather[0].description.replace(
          /\w+/g,
          function (w) {
            return w[0].toUpperCase() + w.slice(1).toLowerCase();
          }
        );
        weeksWeather.push({
          id: index,
          date: new Date(dayForecast.dt * 1000),
          description: desc,
          temp: dayForecast.main.temp,
        });
      }
    }
    this.setState({
      weeksWeather,
    });
    console.log(responseData);
  };

  renderRows = () => {
    const { weeksWeather } = this.state;
    console.log(weeksWeather);
    return weeksWeather.map((dayForecast) => {
      return (
        <tr>
          <td>{dayForecast.date.toString().substring(0, 15)}</td>
          <td>{dayForecast.description}</td>
          <td>{dayForecast.temp}</td>
        </tr>
      );
    });
  };

  renderTable = () => {
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  };
  async componentDidUpdate() {
    if (!this.state.weeksWeather) await this.getWeeksWeather();
  }
  render() {
    const { weeksWeather } = this.state;
    return (
      <div className="ten wide column">
        {weeksWeather ? this.renderTable() : "Loading"}
      </div>
    );
  }
}

export default WeekWeather;
