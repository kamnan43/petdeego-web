import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import NextHead from 'next/head';
import dynamic from 'next/dynamic';
import swal from 'sweetalert2';
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
        this.props.service.setCustomer(profile);
        console.log(profile);
      });
  }

  // onSourceLocationChange(e) {
  //   this.setVal('source', {
  //     address: e.address,
  //     lat: e.position.lat,
  //     lng: e.position.lng
  //   });
  // }

  // onDestinationLocationChange(e) {
  //   this.setVal('destination', {
  //     address: e.address,
  //     lat: e.position.lat,
  //     lng: e.position.lng
  //   })
  // }

  onSourceLocationChange(e) {
    if (e.position) {
      this.props.service.changeSourcePosition(e.position);
    }
  }

  onDestinationLocationChange(e) {
    if (e.position) {
      this.props.service.changeDestinationPosition(e.position);
    }
  }

  changePetType(type) {
    this.props.service.changePetType(type);
  }

  setVal = (key, val) => {
    this.props.service.setData(key, val);
  }

  onSubmit = async () => {

    let confirmDialogOptions = {
      title: 'กรุณายืนยันการส่งข้อมูล',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await this.props.service.submit();
        } catch (error) {
          swal({
            type: 'error',
            title: error.message,
            confirmButtonText: 'ตกลง',
          });
          return false;
        }
      },
      allowOutsideClick: () => !swal.isLoading(),
    };

    let result = await swal(confirmDialogOptions);
    if (result.value) {
      swal({
        title: 'บันทึกข้อมูลเรียบร้อย',
        type: 'success',
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    // try {
    //   this.props.service.submit();
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000);
    // } catch (error) {
    //   alert(error.message);
    // }
  }

  render() {
    const service = this.props.service.toJS().data;
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
                  <input className="form-check-input" type="checkbox" id="dog" onClick={this.changePetType.bind(this, 'dog')} value={service.type_dog} />
                  <label className="form-check-label" htmlFor="dog">
                    สุนัข
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="cat" onClick={this.changePetType.bind(this, 'cat')} value={service.type_cat} />
                  <label className="form-check-label" htmlFor="cat">
                    แมว
                  </label>
                </div>
              </div>
            </div>

              <div className="form-group col-sm-12">
                <label>จำนวนสัตว์เลี้ยง</label>
                <input type="number" className="form-control" id="qty" placeholder="" onChange={e => {
                  this.setVal('qty', +e.target.value)
                }} />
              </div>

              <div className="form-group col-sm-12">
                <label>ขนาดสัตว์เลี้ยง</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="S, M, L, XL"
                  onChange={e => {
                    this.setVal('sizes', e.target.value)
                  }} />
              </div>

              <div className="form-group col-sm-12">
                <div className="col-sm-6">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="owner"
                      onChange={e => {
                        this.setVal('owner', e.target.checked)
                      }} />
                    <label className="form-check-label" htmlFor="owner">
                      เจ้าของไปด้วย
                  </label>
                  </div>
                </div>
              </div>

              <div className="form-group col-sm-12">
                <label>ต้นทาง</label>
                <input type="text" className="form-control" id="sourceAddress" onChange={
                  e => {
                    this.setVal('source.address', e.target.value)
                  }
                } />
              </div>

              <div className="form-group col-sm-12">
                <label>ปลายทาง</label>
                <input type="text" className="form-control" id="destinationAddress" onChange={
                  e => {
                    this.setVal('destination.address', e.target.value)
                  }
                } />
              </div>

              <div className="form-group col-sm-12">
                <label>วันที่</label>
                <input type="date" className="form-control" id="date" onChange={e => {
                  this.setVal('date', new Date(e.target.value))
                }} />
              </div>

              <div className="form-group col-sm-12">
                <label>ช่องทางการชำระเงิน</label>
                <div className="radio">
                  <label>
                    <input type="radio" name="optradio" style={{ margin: '5px' }} value={'line'} checked={service.payment === 'line'} onChange={e => { this.setVal('payment', e.target.value) }} />
                    Line Pay
                </label>
                </div>
                <div className="radio">
                  <label><input type="radio" name="optradio" style={{ margin: '5px' }} value={'cash'} checked={service.payment === 'cash'} onChange={e => { this.setVal('payment', e.target.value) }} /> เงินสด</label>
                </div>
              </div>

              <div className="form-group col-sm-12">
                <label>เบอร์โทร</label>
                <input type="text" className="form-control" id="customer_phone" placeholder="" onChange={e => {
                  this.setVal('customer.phone', +e.target.value)
                }} />
              </div>

              <div className="form-group col-sm-12">
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" onClick={this.onSubmit}>
                    Submit
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
