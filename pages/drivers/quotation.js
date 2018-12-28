import { Component } from 'react'
import { observer, inject } from 'mobx-react';
import querystring from 'query-string';
import DefaultLayout from 'components/layout/DefaultLayout';
import { withRouter } from 'next/router';

class Quotation extends Component {
  componentWillMount() {
    if (this.props.router && this.props.router.order_id) {
      const orderId = this.props.router.order_id;
      this.props.quotation.getData(orderId);
    }
  }
  componentDidMount() {
    
  }

  render() {
    let quotation = this.props.quotation.toJS();
    if (quotation.data.length) {
      return (
        <DefaultLayout>
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-form-title" style={{ backgroundImage: 'url(../home/images/bg-01.jpg)' }}>
                <span className="login100-form-title-1">
                  คุณได้เสนอราคาไปแล้ว
                </span>
              </div>
              <form className="login100-form validate-form">
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                    ปิด
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DefaultLayout>
      )
    } else {
      return (
        <DefaultLayout>
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-form-title" style={{ backgroundImage: 'url(../home/images/bg-01.jpg)' }}>
                <span className="login100-form-title-1">
                  Quotation
                </span>
              </div>
              <form className="login100-form validate-form">
                <div className="wrap-input100 validate-input m-b-26" data-validate="Price is required">
                  <span className="label-input100">Price</span>
                  <input className="input100" type="number" name="price" placeholder="0.00" />
                  <span className="focus-input100" />
                </div>
  
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DefaultLayout>
      )
    }
  }
}

export default inject('quotation')(withRouter(observer(Quotation)));
