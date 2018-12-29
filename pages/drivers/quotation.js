import { Component } from 'react'
import { observer, inject } from 'mobx-react';
import querystring from 'query-string';
import DefaultLayout from 'components/layout/DefaultLayout';
import { withRouter } from 'next/router';
import Header from 'components/form/Header';

class Quotation extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    
  }
  async componentDidMount() {
    require('../../src/utils/VConsole');
    let liffHelper = require('../../src/utils/Liffhelper');
    liffHelper.default.getProfile()
      .then(async profile => {
        await this.props.quotation.setDriver(profile);
        if (this.props.router && this.props.router.query && this.props.router.query.order_id) {
          let quotation = this.props.quotation.toJS();
          const orderId = this.props.router.query.order_id;
          this.props.quotation.setOrderId(orderId);
          await this.props.quotation.getData(quotation.driver.userId, orderId);
        }
      });
  }

  onPriceChange(event) {
    this.props.quotation.setPrice(event.target.value);
  }

  async onSubmit() {
    await this.props.quotation.submit();
    const quotation = this.props.quotation.toJS();
    const liffHelper = require('../../src/utils/Liffhelper');
    const message = {
      type: 'text',
      text: `คุณเสนอราคาเรียบร้อยแล้ว (${quotation.price} บาท)`,
    };
    liffHelper.default.sendMessages(message);
    liffHelper.default.closeWindow();
  }

  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  closeLiff() {
    let liffHelper = require('../../src/utils/Liffhelper');
    liffHelper.default.closeWindow();
  }

  render() {
    const quotation = this.props.quotation.toJS();
    if (!this.isEmpty(quotation.data)) {
      return (
        <DefaultLayout>
          <Header title="คุณได้เสนอราคาไปแล้ว" />
          <div className="login100-form  row">
            <form className="col-md-12">
              <div className="form-group">
                <div className="container-login100-form-btn justify-content-center">
                  <input value="ปิด" type="button" name="close" className="login100-form-btn" onClick={() => { this.closeLiff(); }} />
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
          <div className="login100-form row">
            <div className="form-group col-sm-12 nopadding">
              <label className="label-input100" htmlFor="price">ราคา</label>
              <input type="number" className="form-control input100" onChange={this.onPriceChange.bind(this)} id="price" placeholder="0.00" />
              <span class="focus-input100"></span>
            </div>
            <div className="form-group col-sm-12 nopadding m-b-26 m-t-26">
              <div className="container-login100-form-btn justify-content-center">
                <input value="Submit" type="button" className="login100-form-btn" onClick={this.onSubmit.bind(this)} />
              </div>
            </div>
          </div>
        </DefaultLayout>
      )
    }
  }
}

export default inject('quotation')(withRouter(observer(Quotation)));
