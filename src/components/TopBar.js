import React from 'react';

class TopBar extends React.Component {

    renderLocationText() {
        const {loc} = this.props;
        if(loc.lat!== null) return (
            <span>
                Latitude : {loc.lat}
                &nbsp; &nbsp;
                Longitude : {loc.long}
            </span>
        )
        else return "Location Undetected"
    }
    render() {
        return <div className="ui secondary pointing menu top-bar">
            <div className="left menu app-name"> Weather Dashboard</div>
            <div className="right menu location">{this.renderLocationText()}</div>
        </div>
    }
}

export default TopBar;