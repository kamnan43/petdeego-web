import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import NextHead from 'next/head';
import dynamic from 'next/dynamic';
import DefaultLayout from '../../components/layout/DefaultLayout';
const GMapPicker = dynamic(import('../../components/mappicker/GMapPicker'), {
  ssr: false
})

const API_KEY = 'AIzaSyBs77oWyIEnm2pD2LiwCVA6YRv-0_Rjgjs';

class Request extends Component {
  componentDidMount() {

  }

  onSourceLocationChange(e) {
    console.log('source location -> ', e);
  }

  onDestinationLocationChange(e) {
    console.log('destination location -> ', e);
  }

  render() {
    return (
      <Fragment>
        <NextHead>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,places&language=th`}></script>
        </NextHead>
        <DefaultLayout>
            <div className="login100-form-title">
              <span className="login100-form-title-1">
                Sign In
              </span>
            </div>
            <div className="login100-form validate-form">
              <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required"
              style={{borderBottom: 'none'}} >
                <span className="label-input100">ประเภทสัตว์เลี้ยง</span>
                <div className="contact100-form-checkbox">
                  <input className="input-checkbox100" id="ckb1" type="checkbox" name="dog" />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    สุนัข
                  </label>
                </div>
                <br />
                <div className="contact100-form-checkbox">
                  <input className="input-checkbox100" id="ckb1" type="checkbox" name="cat" />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    แมว
                  </label>
                </div>
              </div>

              <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                <span className="label-input100">จำนวนสัตว์เลี้ยง</span>
                <input className="input100" type="number" name="qty" placeholder="" />
                <span className="focus-input100" />
              </div>

              <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                <span className="label-input100">ขนาดสัตว์เลี้ยง</span>
                <input className="input100" type="number" name="qty" placeholder="" />
                <span className="focus-input100" />
              </div>

              <div className="wrap-input100 validate-input m-b-18" style={{borderBottom: 'none'}}>
                <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                <label className="label-checkbox100" htmlFor="ckb1">
                  เจ้าของไปด้วย
                </label>
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

              <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                <span className="label-input100">วันที่</span>
                <input className="input100" type="number" name="qty" placeholder="" />
                <span className="focus-input100" />
              </div>

              <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required"
              style={{borderBottom: 'none'}} >
                <span className="label-input100">ช่องทางการชำระเงิน</span>
                <div className="contact100-form-checkbox">
                  <input className="input-checkbox100" id="ckb1" type="checkbox" name="dog" />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Line Pay
                  </label>
                </div>
                <br />
                <div className="contact100-form-checkbox">
                  <input className="input-checkbox100" id="ckb1" type="checkbox" name="cat" />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    เงินสด
                  </label>
                </div>
              </div>

              <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                <span className="label-input100">เบอร์ติดต่อ</span>
                <input className="input100" type="number" name="tel" placeholder="กรอกเบอร์ติดต่อ" />
                <span className="focus-input100" />
              </div>


              {/* <div className="flex-sb-m w-full p-b-30">
                <div className="contact100-form-checkbox">
                  <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="#" className="txt1">
                    Forgot Password?
                  </a>
                </div>
              </div> */}


              <div className="container-login100-form-btn">
                <button className="login100-form-btn">
                  Login
                </button>
              </div>
            </div>
        </DefaultLayout>
      </Fragment>
    )
  }
}

export default inject('home')(observer(Request));
