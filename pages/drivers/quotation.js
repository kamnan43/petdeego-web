import { Component } from 'react'
import { observer, inject } from 'mobx-react';
import querystring from 'query-string';
import DefaultLayout from 'components/layout/DefaultLayout';
import { withRouter } from 'next/router';
import Header from 'components/form/Header';

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
          <Header title="Quotation" />
          <div className="login100-form  row">
            <form className="col-md-12">
              <div className="form-group">
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
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
          <Header title="Quotation" />
          <div className="login100-form  row">
            <form className="col-md-12">
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="email" className="form-control" id="price" placeholder="0.00" />
              </div>
              <div className="form-group">
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
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
