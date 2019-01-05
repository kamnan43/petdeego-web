import React, { Component, Fragment } from 'react';
import LocationPicker from 'react-location-picker';
import { geolocated } from 'react-geolocated';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

const defaultOptions = {
  containerElement: <div style={{ height: '100%' }} />,
  mapElement: <div style={{ height: '400px' }} />,
  lat: 13.767564051812146,
  lng: 100.53829193115234,
  zoom: 12,
  radius: -1,
};

export class GMapPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useCurrentLocation: false,
      address: '',
      defaultLat: 0,
      defaultLng: 0,
      lat: 0,
      lng: 0,
    };
  }

  componentDidMount() {
    const { coords, address } = this.props;
    this.setState({
      defaultLat: (coords && coords.lat) ? coords.lat : defaultOptions.lat,
      defaultLng: (coords && coords.lng) ? coords.lng : defaultOptions.lng,
      lat: (coords && coords.lat) ? coords.lat : defaultOptions.lat,
      lng: (coords && coords.lng) ? coords.lng : defaultOptions.lng,
      address: address ? address : defaultOptions.address,
    });
  }

  handleLocationChange(e) {
    this.setState({
      useCurrentLocation: false,
      lat: (e && e.position) ? e.position.lat : defaultOptions.lat,
      lng: (e && e.position) ? e.position.lng : defaultOptions.lng,
      address: e.address,
    });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  handleCurrentLocation(e) {
    console.log('this.props.coords', this.props.coords);
    this.setState({
      useCurrentLocation: true,
      lat: this.props.coords.latitude,
      lng: this.props.coords.longitude,
    });
  }

  googlePlaceChange(address) {
    this.setState({ address });
  };

  googlePlaceSelect(address) {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => {
        if (!this.state.useCurrentLocation) {
          const geoLocation = results[0].geometry.location;
          this.setState({
            lat: geoLocation.lat(),
            lng: geoLocation.lng(),
          });
        }
      })
      .catch(error => console.error('Error', error));
  }

  onSelect() {
    if (this.props.onSelect) {
      this.props.onSelect({
        address: this.state.address,
        position: {
          lat: this.state.lat,
          lng: this.state.lng,
        }
      });
    }
  }

  render() {
    let {
      disabled,
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
    } else {
      lat = this.state.lat;
      lng = this.state.lng;
    }

    const gAddressSearchOptions = {
      componentRestrictions: {
        country: 'th',
      },
    };
    const gPlaceAutoComplete = (
      <PlacesAutocomplete
        value={this.state.address || ''}
        onChange={this.googlePlaceChange.bind(this)}
        onSelect={this.googlePlaceSelect.bind(this)}
        searchOptions={gAddressSearchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'ค้นหาที่อยู่หรือสถานที่ใกล้เคียง',
                className: 'location-search-input',
                style: { width: '100%' },
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = (index % 2 === 0)
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = (index % 2 === 0)
                  ? { backgroundColor: '#ffffcc', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );

    return (
      <Fragment>
        {(!this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled) &&
          < label className="label-input100">เปิด Location service เพื่อใช้งานตำแหน่งปัจจุบัน</label>
        }
        <label className="label-input100">{this.props.title}</label>
        {
          this.props.isGeolocationAvailable && this.props.isGeolocationEnabled &&
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={this.handleCurrentLocation.bind(this)}>ใช้ตำแหน่งปัจจุบัน</button>
        }
        {gPlaceAutoComplete}
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
        <button className="btn btn-default" onClick={this.props.onClose}>
          ปิด
                </button>
        <button className="btn btn-success" onClick={this.onSelect.bind(this)}>
          ตกลง
                </button>
      </Fragment >
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
