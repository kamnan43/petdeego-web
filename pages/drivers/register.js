import { Component } from 'react'
import { observer, inject } from 'mobx-react';

import DefaultLayout from 'components/layout/DefaultLayout';
import Header from 'components/form/Header';
import swal from 'sweetalert2';

class Register extends Component {
  state = {
    userId: '',
    name: '',
    image: '',
    tel: '',
    isDog: false,
    isCat: false,
    isOther: false,
    hasCage: false,
  }

  componentWillUnmount() {
    this.props.driver.resetData();
  }

  async componentDidMount() {
    require('../../src/utils/VConsole');
    const liffHelper = require('../../src/utils/Liffhelper');
    let profile;
    try {
      profile = await liffHelper.default.getProfile();
    } catch (err) {
      // this catch is to test LIFF on PC
      profile = {
        userId: 'Uaf01b90203e594b4b43a69290acf68d7',
        displayName: 'หนึ่ง',
        pictureUrl: 'https://profile.line-scdn.net/0h2IBMKqnRbWZ_NEAT3P8SMUNxYwsIGmsuBwJxV1pnYVFRDC0zEAEqA1g0YQEHBn00RAV2VVxkMldS',
      };
    }
    await this.props.driver.getUser(profile.userId);
    let user = this.props.driver.data;
    if (user) {
      this.setState({
        isOldUser: true,
        userId: profile.userId,
        name: user.name,
        image: profile.pictureUrl,
        tel: user.tel,
        isDog: user.isDog,
        isCat: user.isCat,
        isOther: user.isOther,
        hasCage: user.hasCage,
      });
    } else {
      this.setState({
        isOldUser: false,
        userId: profile.userId,
        name: profile.displayName,
        image: profile.pictureUrl,
      });
    }
  }

  // BUTTON EVENT
  gotoSave = async () => {
    let confirmDialogOptions = {
      title: 'ยืนยันการลงทะเบียน',
      showCancelButton: true,
      confirmButtonColor: '#00d5ca',
      cancelButtonColor: '#ff918e',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          let driver = {
            isOldUser: this.state.isOldUser,
            user_id: this.state.userId,
            name: this.state.name,
            image: this.state.image,
            tel: this.state.tel,
            isDog: this.state.isDog,
            isCat: this.state.isCat,
            isOther: this.state.isOther,
            hasCage: this.state.hasCage,
          };
          await this.props.driver.saveData(driver);
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
      setTimeout(() => {
        const liffHelper = require('../../src/utils/Liffhelper');
        const message = {
          type: 'text',
          text: 'บันทึกข้อมูลเรียบร้อยแล้ว ขอบคุณค่ะ'
        };
        liffHelper.default.sendMessages(message);
        liffHelper.default.closeWindow();
      }, 1000);
    }
  }

  render() {
    return (
      <DefaultLayout>
        <Header title="Register Driver" />
        <div className="login100-form row">
          <form className="col-md">
            <div className="form-group">
              <div className="p-relative">
                <label className="label-input100">ชื่อ-นามสกุล :</label>
                <input type="text" className="form-control input100" id="txtName"
                  placeholder=""
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })} />
                <span className="focus-input100"></span>
              </div>
            </div>
            <div className="form-group">
              <div className="p-relative">
                <label className="label-input100">เบอร์ติดต่อ :</label>
                <input type="text" className="form-control input100" id="txtTel"
                  placeholder=""
                  value={this.state.tel}
                  onChange={event => this.setState({ tel: event.target.value })} />
                <span className="focus-input100"></span>
              </div>
            </div>
            <div className="form-group custom-checkbox m-b-40">
              <label className="label-input100 p-b-10">ประเภทสัตว์เลี้ยงที่รับ :</label>
              <input type="checkbox" id="chkDog" className="form-check-input input-checkbox100" checked={this.state.isDog} onChange={event => this.setState({ isDog: event.target.checked })} />
              <label className="form-check-label label-checkbox100" htmlFor="chkDog">สุนัข</label>
              <input type="checkbox" id="chkCat" className="form-check-input input-checkbox100" checked={this.state.isCat} onChange={event => this.setState({ isCat: event.target.checked })} />
              <label className="form-check-label label-checkbox100" htmlFor="chkCat">แมว</label>
            </div>
            <div className="form-group m-b-40" style={{ textAlign: 'center', width: 230, margin: 'auto' }}>
              <input type="checkbox" id="chkCage" checked={this.state.hasCage} className="form-check-input input-checkbox100"
                onChange={event => this.setState({ hasCage: event.target.checked })} />
              <label className="form-check-label label-checkbox100" htmlFor="chkCage">ต้องมีกรง หรือตะกร้า เท่านั้น</label>
              {/* <input type="checkbox" id="chkCage"
                checked={this.state.hasCage}
                onChange={event => this.setState({ hasCage: event.target.checked })} />
              &nbsp;&nbsp;ต้องมีกรง หรือตะกร้า เท่านั้น */}
            </div>
            <div className="form-group m-b-26 m-t-26">
              <div className="container-login100-form-btn" style={{ justifyContent: 'center' }}>
                <input type="button" id="btnSubmit" value="ยืนยัน" className="login100-form-btn" onClick={this.gotoSave} />
              </div>
            </div>
          </form>
        </div>
      </DefaultLayout >
    )
  }
}

export default inject('driver')(observer(Register));
