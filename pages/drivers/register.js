import { Component } from 'react'
import { observer, inject } from 'mobx-react';

import DefaultLayout from 'components/layout/DefaultLayout';
import Header from 'components/form/Header';

class Register extends Component {
  state = {
    userId: '',
    name: '',
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
    let profile = await liffHelper.default.getProfile()
    console.log("======== profile", profile);
    let user = await this.props.driver.getUser(profile.userId);
    console.log("======== user", user);
    if (user) {
      this.setState({
        isOldUser: true,
        name: user.name,
        tel: profile.tel,
      });
    } else {
      this.setState({
        isOldUser: false,
        userId: profile.userId,
      });
    }
  }

  // BUTTON EVENT
  gotoSave = async () => {
    let driver = {
      isOldUser: this.state.isOldUser,
      user_id: this.state.userId,
      name: this.state.name,
      tel: this.state.tel,
      isDog: this.state.isDog,
      isCat: this.state.isCat,
      isOther: this.state.isOther,
      hasCage: this.state.hasCage,
    };
    await this.props.driver.saveData(driver);

    const liffHelper = require('../../src/utils/Liffhelper');
    liffHelper.default.closeWindow();
  }

  render() {
    return (
      <DefaultLayout>
        <Header title="Register Driver" />
        <div className="login100-form row">
          <form className="col-md">
            <div className="form-group">
              <label>ชื่อ-นามสกุล :</label>
              <input type="text" className="form-control" id="txtName"
                placeholder=""
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })} />
            </div>
            <div className="form-group">
              <label>เบอร์ติดต่อ :</label>
              <input type="text" className="form-control" id="txtTel"
                placeholder=""
                value={this.state.tel}
                onChange={event => this.setState({ tel: event.target.value })} />
            </div>
            <div className="form-group custom-checkbox">
              <label>ประเภทสัตว์เลี้ยง :</label>
              <input type="checkbox" id="chkDog" value={this.state.isDog} onChange={event => this.setState({ isDog: event.target.checked })} /> &nbsp;สุนัข
              &nbsp;&nbsp;&nbsp;
              <input type="checkbox" id="chkCat" value={this.state.isCat} onChange={event => this.setState({ isCat: event.target.checked })} /> &nbsp;แมว
              &nbsp;&nbsp;&nbsp;
              <input type="checkbox" id="chkCat" value={this.state.isOther} onChange={event => this.setState({ isOther: event.target.checked })} /> &nbsp;อื่นๆ
            </div>
            <div className="form-group" style={{ textAlign: 'center' }}>
              <input type="checkbox" id="chkCage"
                value={this.state.hasCage}
                onChange={event => this.setState({ hasCage: event.target.checked })} />
              &nbsp;&nbsp;ต้องมีกรง หรือตะกร้า เท่านั้น
            </div>
            <div className="form-group">
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
