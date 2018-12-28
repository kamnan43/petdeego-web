import { Component } from 'react'
import { observer, inject } from 'mobx-react';
import querystring from 'query-string';
import DefaultLayout from 'components/layout/DefaultLayout';
import { withRouter } from 'next/router';
import Header from 'components/form/Header';

class Quotation extends Component {
  componentWillMount() {
    
  }
  async componentDidMount() {
    require('../../src/utils/VConsole');
    const liffHelper = require('../../src/utils/Liffhelper');
    liffHelper.default.getProfile()
      .then(profile => {
        this.props.quotation.setDriver(profile);
      });

    if (this.props.router && this.props.router.query && this.props.router.query.order_id) {
      let quotation = this.props.quotation.toJS();
      const orderId = this.props.router.query.order_id;
      this.props.quotation.setOrderId(orderId);
      await this.props.quotation.getData(quotation.driver.userId, orderId);
    }
  }

  onPriceChange(event) {
    this.props.quotation.setPrice(event.target.value);
  }

  onSubmit() {
    this.props.quotation.submit();
  }

  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  render() {
    let quotation = this.props.quotation.toJS();
    if (!this.isEmpty(quotation.data)) {
      return (
        <DefaultLayout>
          <Header title="คุณได้เสนอราคาไปแล้ว" />
          <div className="login100-form  row">
            <form className="col-md-12">
              <div className="form-group">
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" onClick={() => { liffHelper.closeWindow() }}>
                    ปิด
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DefaultLayout>
      )
    } else {
      return (
        <DefaultLayout>
          <Header title="เสนอราคา" />
          <div className="login100-form  row">
            <form className="col-md-12" onSubmit={false}>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number" className="form-control" onChange={this.onPriceChange.bind(this)} id="price" placeholder="0.00" />
              </div>
              <div className="form-group">
                <div className="container-login100-form-btn">
                  <button type="button" className="login100-form-btn" onClick={this.onSubmit.bind(this)}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DefaultLayout>
      )
    }
  }
}

export default inject('quotation')(withRouter(observer(Quotation)));
