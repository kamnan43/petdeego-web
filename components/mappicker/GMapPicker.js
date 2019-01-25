import React, { Component, Fragment } from 'react';
import LocationPicker from 'react-location-picker';
import { geolocated } from 'react-geolocated';
import swal from 'sweetalert2';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    const { coordinated, address } = this.props;
    this.setState({
      defaultLat: (coordinated && coordinated.lat) ? coordinated.lat : defaultOptions.lat,
      defaultLng: (coordinated && coordinated.lng) ? coordinated.lng : defaultOptions.lng,
      lat: (coordinated && coordinated.lat) ? coordinated.lat : defaultOptions.lat,
      lng: (coordinated && coordinated.lng) ? coordinated.lng : defaultOptions.lng,
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
    if (!this.props.isGeolocationAvailable) {
      swal({
        title: 'กรุณาเปิด Location Service',
        type: 'warning',
      });
      return;
    }
    if (!this.props.isGeolocationEnabled) {
      swal({
        title: 'กรุณาเปิด Location Service',
        type: 'warning',
      });
      return;
    }
    if (!this.props.coords) {
      swal({
        title: 'กรุณาเปิด Location Service หรือรอสักครู่',
        type: 'warning',
      });
      return;
    }
    this.setState({
      useCurrentLocation: true,
      defaultLat: this.props.coords.latitude,
      defaultLng: this.props.coords.longitude,
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
                  ? { backgroundColor: '#00d5ca12', cursor: 'pointer', padding: '5px' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer', padding: '5px' };
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
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-12 address-auto-input">
              {gPlaceAutoComplete}
            </div>
            <div className="col-xs-12 col-md-12 p-b-10">
              {(!this.props.isGeolocationAvailable || !this.props.isGeolocationEnabled) &&
                < label className="label-input100">เปิด Location service เพื่อใช้งานตำแหน่งปัจจุบัน</label>
              }
              <label className="label-input100">{this.props.title}</label>
              {
                this.props.isGeolocationAvailable && this.props.isGeolocationEnabled &&
                <button
                  type="button"
                  className="btn100-default btn-current-gmap"
                  onClick={this.handleCurrentLocation.bind(this)}><FontAwesomeIcon icon="map-pin" /> ใช้ตำแหน่งปัจจุบัน</button>
              }
            </div>
            <div className="col-xs-12 col-md-12 nopadding">
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
            </div>
            <div className="col-xs-12 col-md-12 text-center p-t-15">
              <button className="btn100-primary btn-select-gmap" onClick={this.onSelect.bind(this)}><FontAwesomeIcon icon="map-marker-alt" /> เลือกที่อยู่นี้</button>
              <button className="btn100-default btn-close-gmap" onClick={this.props.onClose}><FontAwesomeIcon icon="times" /> ปิดแผนที่</button>
            </div>
          </div>
        </div>
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
