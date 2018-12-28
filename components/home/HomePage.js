import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';

import Header from 'components/form/Header';
class HomePage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Fragment>
        <Header title="WELCOME" />
        <div className="login100-form row">
          <form className="col-md">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1 p-b-18">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1 p-b-18">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* <form className="login100-form validate-form">
          <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
            <span className="label-input100">Username</span>
            <input className="input100" type="text" name="username" placeholder="Enter username" />
            <span className="focus-input100" />
          </div>
          <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
            <span className="label-input100">Password</span>
            <input className="input100" type="password" name="pass" placeholder="Enter password" />
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
        </form> */}
      </Fragment>
    );
  }
}

export default inject('home')(observer(HomePage));