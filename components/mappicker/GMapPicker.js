import React, { Component, Fragment } from 'react';
import LocationPicker from 'react-location-picker';
import { geolocated } from 'react-geolocated';
import { throws } from 'assert';

const defaultOptions = {
  containerElement: <div style={ {height: '100%'} } />,
  mapElement: <div style={ {height: '400px'} } />,
  lat: 13.8041172,
  lng: 100.5360331,
  zoom: 12,
  radius: -1,
};

export class GMapPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useCurrentLocation: true,
      defaultLat: 0,
      defaultLng: 0,
      lat: 0,
      lng: 0,
    };
  }

  componentDidMount() {
    const { coords } = this.props;
    this.setState({
      defaultLat: (coords && coords.latitude) ? coords.latitude : defaultOptions.lat,
      defaultLng: (coords && coords.longitude) ? coords.longitude : defaultOptions.lng,
    });
  }

  handleLocationChange(e) {
     this.setState({
      useCurrentLocation: false,
      lat: (e && e.position) ? e.position.lat : defaultOptions.lat,
      lng: (e && e.position) ? e.position.lng : defaultOptions.lng,
    });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  handleCurrentLocation(e) {
    this.setState({
      useCurrentLocation: true
    });
  }

  render() {
    let {
      coords,
      disabled,
      position,
      containerElement,
      mapElement,
      zoom,
      radius,
    } = this.props;

    containerElement = containerElement || defaultOptions.containerElement;
    mapElement = mapElement || defaultOptions.mapElement;
    zoom = zoom || defaultOptions.zoom;
    radius = radius || defaultOptions.radius;

    let lat;
    let lng;
    if (this.state.useCurrentLocation) {
      lat = this.state.defaultLat;
      lng = this.state.defaultLng;
    }

    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.handleCurrentLocation.bind(this)}>ตำแหน่งปัจจุบัน</button>
        <LocationPicker
          disabled={disabled}
          containerElement={containerElement}
          mapElement={mapElement}
          defaultPosition={{
            lat,
            lng,
          }}
          zoom={zoom}
          radius={radius}
          onChange={this.handleLocationChange.bind(this)}
        />
      </Fragment>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    watchPosition: true,
  },
  userDecisionTimeout: 15000,
})(GMapPicker);
