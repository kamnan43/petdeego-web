import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import Header from 'components/form/Header';
// import { isolateGlobalState } from 'mobx/lib/internal';

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


  render() {
    const service = this.props.service.toJS().data;
    const cat = service.pet_type.find(val => val === 'cat');
    const dog = service.pet_type.find(val => val === 'dog');

    return (
      <Fragment>
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
            </div>

            <div className="form-group col-sm-12">
              <label>จำนวนสัตว์เลี้ยง</label>
              <input type="number" name="quantity" value="1" min="1" max="5" step="1" />
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
              <input type="" className="form-control" id="exampleInputPassword1" placeholder="" />
            </div>

            <div className="form-group col-sm-12">
              <label>ช่องทางการชำระเงิน</label>
              <input type="" className="form-control" id="exampleInputPassword1" placeholder="" />
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
