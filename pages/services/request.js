import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import DefaultLayout from '../../components/layout/DefaultLayout';

class Request extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <DefaultLayout>
            <div className="login100-form-title">
              <span className="login100-form-title-1">
                Sign In
              </span>
            </div>
            <div className="login100-form validate-form">
              <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                <span className="label-input100">ประเภทสัตว์เลี้ยง</span>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                <label className="form-check-label" for="inlineCheckbox1">สุนัข</label>
              </div>
              <br />
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label className="form-check-label" for="inlineCheckbox2">แมว</label>
              </div>
                {/* <input className="input100" type="text" name="type" placeholder="กรอก" /> */}
                <span className="focus-input100" />
              </div>
              <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                <span className="label-input100">จำนวนสัตว์เลี้ยง</span>
                <input className="input100" type="number" name="qty" placeholder="Enter password" />
                <span className="focus-input100" />
              </div>
              <div className="flex-sb-m w-full p-b-30">
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
              </div>
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
