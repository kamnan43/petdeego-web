import { Component } from 'react'
import NextHead from 'next/head'
import dynamic from 'next/dynamic'

const GMapPicker = dynamic(import('../../components/mappicker/GMapPicker'), {
  ssr: false
})

const API_KEY = 'AIzaSyBs77oWyIEnm2pD2LiwCVA6YRv-0_Rjgjs';

class Index extends Component {
  componentDidMount() {

  }

  onLocationChange(e) {
    console.log('on location change -> ', e);
  }

  render() {
    return (
      <div>
        <NextHead>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,places&language=th`}></script>
        </NextHead>
        <GMapPicker
          containerElement={<div style={ {height: '100%'} } />}
          mapElement={<div style={ {height: '400px'} } />}
          onChange={this.onLocationChange.bind(this)}
        />
      </div>
    )
  }
}

export default Index;
