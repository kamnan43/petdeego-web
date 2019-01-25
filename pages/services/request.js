import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import NextHead from 'next/head';
import dynamic from 'next/dynamic';
import swal from 'sweetalert2';
// import Datetime from 'react-datetime';
import delay from 'delay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DefaultLayout from '../../components/layout/DefaultLayout';
import Header from '../../components/form/Header';
import { datetime } from '../../src/utils/datetime';
// import { relative } from 'path';

const GMapPicker = dynamic(import('../../components/mappicker/GMapPicker'), {
  ssr: false
})

const API_KEY = 'AIzaSyBs77oWyIEnm2pD2LiwCVA6YRv-0_Rjgjs';

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSourceMapPicker: false,
      showDestinationMapPicker: false,
    };
  }

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

  onOpenSourceMapPicker() {
    this.setState({ showSourceMapPicker: true });
  }

  onOpenDestinationMapPicker() {
    this.setState({ showDestinationMapPicker: true });
  }

  onHideMapLocation() {
    this.setState({
      showSourceMapPicker: false,
      showDestinationMapPicker: false
    });
  }

  onSourceLocationChange(e) {
    this.setState({
      showSourceMapPicker: false,
    });
    if (e.position) {
      this.props.service.changeSourcePosition(e.position, e.address);
      this.calculatePrice();
    }
  }

  onDestinationLocationChange(e) {
    this.setState({
      showDestinationMapPicker: false
    });
    if (e.position) {
      this.props.service.changeDestinationPosition(e.position, e.address);
      this.calculatePrice();
    }
  }

  calculatePrice() {
    const service = this.props.service.toJS().data;
    if (service.source && service.source.lat && service.destination && service.destination.lat) {
      this.props.service.getPrice();
    }
  }

  changePetType(type, e) {
    this.props.service.changePetType(type, e.target.checked);
  }

  onCallNow() {
    this.setVal('date', datetime.moment().format('YYYY-MM-DD'));
    this.setVal('time', datetime.moment().format('HH:ss'));
  }

  setVal = (key, val) => {
    this.props.service.setData(key, val);
  }

  onSubmit = async () => {
    const service = this.props.service.toJS().data;

    if (!service.type_dog && !service.type_cat) {
      swal({
        title: 'กรุณาเลือกประเภทสัตว์เลี้ยง',
        type: 'warning',
      });
      return;
    }
    if (!service.source.address) {
      swal({
        title: 'กรุณาเลือกต้นทาง',
        type: 'warning',
      });
      return;
    }
    if (!service.destination.address) {
      swal({
        title: 'กรุณาเลือกปลายทาง',
        type: 'warning',
      });
      return;
    }
    if (!service.date) {
      swal({
        title: 'กรุณาเลือกวัน-เวลาที่ต้องการใช้บริการ',
        type: 'warning',
      });
      return;
    }
    if (!service.customer.phone) {
      swal({
        title: 'กรุณาระบุเบอร์ติดต่อ',
        type: 'warning',
      });
      return;
    }
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
        confirmButtonColor: '#00d5ca',
        title: 'บันทึกข้อมูลเรียบร้อย',
        type: 'success',
      });
      // setTimeout(() => {
      // }, 1000);
      await delay(1000);
      const liffHelper = require('../../src/utils/Liffhelper');
      const message = {
        type: 'text',
        text: 'ระบบกำลังนัดหมายรถตามที่คุณต้องการ กรุณารอการตอบกลับจากคนขับ'
      };
      liffHelper.default.sendMessages(message);
      liffHelper.default.closeWindow();
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
    // const strDate = datetime.moment(service.date).format('yyyy-MM-dd')
    // const strTime = datetime.moment(service.date).format('HH:mm')
    return (
      <Fragment>
        <NextHead>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,places&language=th`}></script>
        </NextHead>
        <DefaultLayout>
          <Header title="Order" />
          <div className="login100-form p-b-100 row">
            <div className="form-group col-sm-12 m-b-26">
              <label className="label-input100 p-b-10">ประเภทสัตว์เลี้ยง</label>
              <div className="col-sm-6 nopadding">
                <div className="contact100-form-checkbox">
                  <input className="form-check-input input-checkbox100" id="dog" type="checkbox" name="dog" onChange={this.changePetType.bind(this, 'dog')} checked={service.type_dog} />
                  <label className="form-check-label label-checkbox100" htmlFor="dog">สุนัข</label>
                </div>
                <div className="contact100-form-checkbox">
                  <input className="form-check-input input-checkbox100" id="cat" type="checkbox" name="cat" onChange={this.changePetType.bind(this, 'cat')} checked={service.type_cat} />
                  <label className="form-check-label label-checkbox100" htmlFor="cat">แมว</label>
                </div>
              </div>
            </div>

            <div className="form-group col-sm-12 m-b-26">
              <div className="p-relative">
                <label className="label-input100">จำนวนสัตว์เลี้ยง</label>
                <input type="number" className="form-control input100" id="qty" placeholder="" value={service.qty} onChange={e => {
                  this.setVal('qty', e.target.value)
                }} />
                <span className="focus-input100"></span>
              </div>
            </div>

            {/* <div className="form-group col-sm-12 m-b-26">
              <div className="p-relative">
                <label className="label-input100">ขนาดสัตว์เลี้ยง</label>
                <input type="text" className="form-control input100" id="sizes" placeholder="S, M, L, XL"
                  onChange={e => {
                    this.setVal('sizes', e.target.value)
                  }} />
                <span className="focus-input100"></span>
              </div>
            </div> */}

            <div className="form-group col-sm-12 m-b-26">
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

            <div className="form-group col-sm-12 m-b-26 m-t-32">
              <label className="label-input100">วัน-เวลาที่ต้องการใช้บริการ</label>
              {/* <Datetime defaultValue={service.date ? date : ''} dateFormat='DD/MM/YYYY' timeFormat='HH:mm' inputProps={{ className: "form-control input100 inputDate100", readOnly: true }} onChange={e => {
                  this.setVal('date', e.format())
                }} />
                <span className="focus-input100"></span> */}
              <div className="form-group col-sm-12 row">
                <input type="date" className="form-control col-5"
                  id="date" value={service.date} onChange={e => {
                    this.setVal('date', e.target.value)
                  }} />
                <input type="time" className="form-control col-4"
                  id="time" value={service.time} onChange={e => {
                    this.setVal('time', e.target.value)
                  }} />
                <button className="btn btn-sm btn-info col-3" onClick={this.onCallNow.bind(this)}>
                  เรียกทันที
                </button>
              </div>
            </div>

            <div className="form-group col-sm-12 m-b-0">
              <label className="label-input100 p-b-10">ต้นทาง</label>
              {service.source.address &&
                <div className="address-text">{service.source.address}</div>
                // <input type="text" disabled className="form-control input100" id="sourceAddress" value={service.source.address} />
              }
              {!this.state.showSourceMapPicker &&
                <div className="select-address" onClick={this.onOpenSourceMapPicker.bind(this)}>
                  <FontAwesomeIcon icon="map-marker-alt" /> {(service.source.address) ? 'แก้ไขที่อยู่' : 'เลือกจากแผนที่'}
                </div>
              }
              {/* <span className="focus-input100"></span> */}
            </div>
            {this.state.showSourceMapPicker &&
              <div className="form-group col-sm-12 nopadding wrap-address-gmap">
                <div className="address-gmap">
                  <GMapPicker
                    title=''
                    coordinated={service.source}
                    address={service.source.address}
                    onSelect={this.onSourceLocationChange.bind(this)}
                    onClose={this.onHideMapLocation.bind(this)} />
                </div>
              </div>
            }

            <div className="form-group col-sm-12 m-b-0 m-t-26">
              <label className="label-input100 p-b-10">ปลายทาง</label>
              {service.destination.address &&
                <div className="address-text">{service.destination.address}</div>
                // <input type="text" disabled className="form-control input100" id="destinationAddress" value={service.destination.address} />
              }
              {!this.state.showDestinationMapPicker &&
                <div className="select-address" onClick={this.onOpenDestinationMapPicker.bind(this)}>
                  <FontAwesomeIcon icon="map-marker-alt" /> {(service.destination.address) ? 'แก้ไขที่อยู่' : 'เลือกจากแผนที่'}
                </div>
              }
              {/* <span className="focus-input100"></span> */}
            </div>
            {this.state.showDestinationMapPicker &&
              <div className="form-group col-sm-12 nopadding wrap-address-gmap ">
                <div className="address-gmap">
                  <GMapPicker
                    title=''
                    coordinated={service.destination}
                    address={service.destination.address}
                    onSelect={this.onDestinationLocationChange.bind(this)}
                    onClose={this.onHideMapLocation.bind(this)} />
                </div>
              </div>
            }

            <div className="form-group col-sm-12 m-b-26 m-t-26">
              <label className="label-input100 p-b-10">ค่าบริการ (คำนวณจากระยะทาง)</label>
              <label className="label-input100 p-b-10"><b>{service.price ? service.price : 'N/A'} บาท</b></label>
            </div>

            <div className="form-group col-sm-12 m-b-26">
              <label className="label-input100 p-b-10">ช่องทางการชำระเงิน</label>
              <div className="radio">
                <label>
                  <input type="radio" name="optradio" style={{ margin: '5px' }} value={'line'} checked={service.payment === 'line'} onChange={e => { this.setVal('payment', e.target.value) }} /> Line Pay</label>
              </div>
              <div className="radio">
                <label><input type="radio" name="optradio" style={{ margin: '5px' }} value={'cash'} checked={service.payment === 'cash'} onChange={e => { this.setVal('payment', e.target.value) }} /> เงินสด</label>
              </div>
            </div>

            <div className="form-group col-sm-12 m-b-26">
              <div className="p-relative">
                <label className="label-input100">เบอร์ติดต่อ</label>
                <input type="number" className="form-control input100" id="customer_phone" placeholder="" onChange={e => {
                  this.setVal('customer.phone', e.target.value)
                }} />
                <span className="focus-input100"></span>
              </div>
            </div>

            <div className="form-group col-sm-12 m-b-26 m-t-26">
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
