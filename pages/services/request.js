import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import NextHead from 'next/head';
import dynamic from 'next/dynamic';
import DefaultLayout from '../../components/layout/DefaultLayout';
import Header from 'components/form/Header';
// import { isolateGlobalState } from 'mobx/lib/internal';

const GMapPicker = dynamic(import('../../components/mappicker/GMapPicker'), {
  ssr: false
})

const API_KEY = 'AIzaSyBs77oWyIEnm2pD2LiwCVA6YRv-0_Rjgjs';

class Request extends Component {
  componentDidMount() {
    require('../../src/utils/VConsole');
    const liffHelper = require('../../src/utils/Liffhelper');
    liffHelper.default.getProfile()
      .then(profile => {
        console.log(profile);
      });
  }

  checkDog(event) {
    const type = this.props.service.toJS().data.pet_type;
    const found = type.find(val => val === 'dog');
    if (found) {
    } else {

    }
    console.log('event', event.target.value);
  }

  checkCat(event) {
    console.log('event', event.target.value);
  }

  onSourceLocationChange(e) {
    console.log('source location -> ', e);
  }

  onDestinationLocationChange(e) {
    console.log('destination location -> ', e);
  }
  setQty() {
    
  }

  render() {
    const service = this.props.service.toJS().data;
    const cat = service.pet_type.find(val => val === 'cat');
    const dog = service.pet_type.find(val => val === 'dog');

    return (
      <Fragment>
        <NextHead>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,places&language=th`}></script>
        </NextHead>
        <DefaultLayout>
          <Header title="Order" />
          <div className="login100-form row">
            <div className="form-group col-sm-12">
              <label> ประเภทสัตว์เลี้ยง</label>
              <div className="col-sm-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="dog" onClick={this.checkDog.bind(this)} checked={dog} />
                  <label className="form-check-label">
                    สุนัข
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="cat" onClick={this.checkCat.bind(this)} checked={cat} />
                  <label className="form-check-label">
                    แมว
                  </label>
                </div>
              </div>


              <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                <span className="label-input100">ต้นทาง</span>
                <input className="input100" type="number" name="qty" placeholder="" />
                <span className="focus-input100" />
                <GMapPicker
                  mapElement={<div style={ {height: '250px'} } />}
                  onChange={this.onSourceLocationChange.bind(this)}
                  showCurrentLocationButton
                />
              </div>
            </div>

            <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
              <span className="label-input100">ปลายทาง</span>
              <input className="input100" type="number" name="qty" placeholder="" />
              <span className="focus-input100" />
              <GMapPicker
                mapElement={<div style={ {height: '250px'} } />}
                onChange={this.onDestinationLocationChange.bind(this)}
                showCurrentLocationButton
              />
            </div>

            <div className="form-group col-sm-12">
               <label>จำนวนสัตว์เลี้ยง</label>
               <input type="text" className="form-control" id="qty" placeholder="" />
              </div>

            <div className="form-group col-sm-12">
              <label>ขนาดสัตว์เลี้ยง</label>
              <input type="" className="form-control" id="exampleInputPassword1" placeholder="" />
            </div>

            <div className="form-group col-sm-12">
              <div className="col-sm-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="cat" />
                  <label className="form-check-label">
                    เจ้าของไปด้วย
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group col-sm-12">
              <label>ต้นทาง</label>
              <input type="" className="form-control" id="exampleInputPassword1" placeholder="" />
            </div>

            <div className="form-group col-sm-12">
              <label>ปลายทาง</label>
              <input type="" className="form-control" id="exampleInputPassword1" placeholder="" />
            </div>

            <div className="form-group col-sm-12">
              <label>วันที่</label>
              <input type="date" className="form-control" id="date" />
            </div>

            <div className="form-group col-sm-12">
              <label>ช่องทางการชำระเงิน</label>
              <div className="radio">
                <label>
                  <input type="radio" name="optradio" style={{margin: '5px'}} checked={'line'} />
                  Line Pay
                </label>
              </div>
              <div className="radio">
                <label><input type="radio" name="optradio" style={{margin: '5px'}} checked={'cash'} /> เงินสด</label>
              </div>

            </div>

            <div className="form-group col-sm-12">
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">
                  Login
                </button>
              </div>
            </div>

          </div>
        </DefaultLayout>
      </Fragment>
    )
  }
}

export default inject('service')(observer(Request));
