import React from "react";
import { Button, Modal } from "semantic-ui-react";

class TodaysWeatherDetails extends React.Component {
  renderModal = () => {
    const { todaysWeather } = this.props;
    const { moreInfo } = todaysWeather;
    return (
      <Modal trigger={<Button>Show Details</Button>}>
        <Modal.Header>Today's Weather Details</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <table className="ui called table">
              <thead>
                <tr>
                  <th>High Temperature</th>
                  <th>Low Temperature</th>
                  <th>Pressure</th>
                  <th>Humidity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{moreInfo.htemp}</td>
                  <td>{moreInfo.ltemp}</td>
                  <td>{moreInfo.pressure}</td>
                  <td>{moreInfo.humidity}</td>
                </tr>
              </tbody>
            </table>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  };
  render() {
    const { todaysWeather } = this.props;
    return todaysWeather ? this.renderModal() : <div>Loading</div>;
  }
}

export default TodaysWeatherDetails;
