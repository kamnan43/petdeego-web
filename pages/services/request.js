import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import NextHead from 'next/head';
import dynamic from 'next/dynamic';
import swal from 'sweetalert2';
import DefaultLayout from '../../components/layout/DefaultLayout';
import Header from 'components/form/Header';
import { datetime } from '../../src/utils/datetime';
import Datetime from 'react-datetime';

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
      })
      .catch(err => {
        console.log('err', err);
        const profile = {
          userId: 'U9a177bd20d2fe886e1551d282a653494',
          displayName: 'หนึ่ง',
          pictureUrl: 'http://dl.profile.line-cdn.net/0h2IBMKqnRbWZ_NEAT3P8SMUNxYwsIGmsuBwJxV1pnYVFRDC0zEAEqA1g0YQEHBn00RAV2VVxkMldS',
        };
        this.props.service.setCustomer(profile);
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
      confirmButtonColor: '#00d5ca',
      cancelButtonColor: '#ff918e',
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
        const liffHelper = require('../../src/utils/Liffhelper');
        const message = {
          type: 'text',
          text: 'ระบบกำลังนัดหมายรถตามที่คุณต้องการ กรุณารอการตอบกลับจากคนขับ'
        };
        liffHelper.default.sendMessages(message);
        liffHelper.default.closeWindow();
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
    const date = datetime.moment(service.date).format('DD/MM/YYYY HH:mm')
    return (
      <Fragment>
        <NextHead>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,places&language=th`}></script>
        </NextHead>
        <DefaultLayout>
          <Header title="Order" />
          <div className="login100-form row">
            <div className="form-group col-sm-12 nopadding m-b-26">
              <label className="label-input100 p-b-10">ประเภทสัตว์เลี้ยง</label>
              <div className="col-sm-6 nopadding">
                <div className="contact100-form-checkbox">
                  <input className="form-check-input input-checkbox100" id="dog" type="checkbox" name="dog" onClick={this.changePetType.bind(this, 'dog')} value={service.type_dog} />
                  <label className="form-check-label label-checkbox100" htmlFor="dog">สุนัข</label>
                </div>
                <div className="contact100-form-checkbox">
                  <input className="form-check-input input-checkbox100" id="cat" type="checkbox" name="cat" onClick={this.changePetType.bind(this, 'cat')} value={service.type_cat} />
                  <label className="form-check-label label-checkbox100" htmlFor="cat">แมว</label>
                </div>
              </div>
            </div>

            <div className="form-group col-sm-12 nopadding m-b-26">
              <label className="label-input100">จำนวนสัตว์เลี้ยง</label>
              <input type="number" className="form-control input100" id="qty" placeholder="" value="1" onChange={e => {
                this.setVal('qty', +e.target.value)
              }} />
              <span className="focus-input100"></span>
            </div>

            <div className="form-group col-sm-12 nopadding m-b-26">
              <label className="label-input100">ขนาดสัตว์เลี้ยง</label>
              <input type="text" className="form-control input100" id="sizes" placeholder="S, M, L, XL"
                onChange={e => {
                  this.setVal('sizes', e.target.value)
                }} />
              <span className="focus-input100"></span>
            </div>

            <div className="form-group col-sm-12 nopadding m-b-26">
              <div className="col-sm-6 nopadding">
                <div className="contact100-form-checkbox">
                  <input className="form-check-input input-checkbox100" id="owner"
                    type="checkbox" name="owner"
                    onChange={e => {
                      this.setVal('owner', e.target.checked)
                    }} />
                  <label className="form-check-label label-checkbox100" htmlFor="owner">
                    เจ้าของไปด้วย
                    </label>
                </div>
              </div>
            </div>

            <div className="form-group col-sm-12 nopadding m-b-26">
              <label className="label-input100">ต้นทาง</label>
              <input type="text" className="form-control input100" id="sourceAddress" onChange={
                e => {
                  this.setVal('source.address', e.target.value)
                }
              } />
              <span className="focus-input100"></span>
            </div>

            <div className="form-group col-sm-12 nopadding m-b-26">
              <label className="label-input100">ปลายทาง</label>
              <input type="text" className="form-control input100" id="destinationAddress" onChange={
                e => {
                  this.setVal('destination.address', e.target.value)
                }
              } />
              <span className="focus-input100"></span>
            </div>

            <div className="form-group col-sm-12 nopadding m-b-26">
              <label className="label-input100">วันที่</label>
              <Datetime defaultValue={date} dateFormat='DD/MM/YYYY' timeFormat='HH:mm' inputProps={{ className: "form-control input100" }} onChange={e => {
                this.setVal('date', e.format())
              }} />
              <span className="focus-input100"></span>
              {/* <input type="date" className="form-control"
                id="date" value={service.date} value={date} onChange={e => {
                  this.setVal('date', new Date(e.target.value))
                }} /> */}
            </div>

            <div className="form-group col-sm-12 nopadding m-b-26">
              <label className="label-input100 p-b-10">ช่องทางการชำระเงิน</label>
              <div className="radio">
                <label>
                  <input type="radio" name="optradio" style={{ margin: '5px' }} value={'line'} checked={service.payment === 'line'} onChange={e => { this.setVal('payment', e.target.value) }} /> Line Pay</label>
              </div>
              <div className="radio">
                <label><input type="radio" name="optradio" style={{ margin: '5px' }} value={'cash'} checked={service.payment === 'cash'} onChange={e => { this.setVal('payment', e.target.value) }} /> เงินสด</label>
              </div>
            </div>

            <div className="form-group col-sm-12 nopadding m-b-26">
              <label className="label-input100">เบอร์โทร</label>
              <input type="text" className="form-control input100" id="customer_phone" placeholder="" onChange={e => {
                this.setVal('customer.phone', +e.target.value)
              }} />
              <span className="focus-input100"></span>
            </div>

            <div className="form-group col-sm-12 nopadding m-b-26 m-t-26">
              <div className="container-login100-form-btn justify-content-center ">
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
