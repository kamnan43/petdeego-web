import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';

import DefaultLayout from 'components/layout/DefaultLayout';
import Header from 'components/form/Header';

class Register extends Component {
  state = {
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

  componentDidMount() {
  }

  // BUTTON EVENT
  gotoSave = async () => {
    try {
      console.log("======== gotoSave");
      let driver = {
        name: this.state.name,
        tel: this.state.tel,
        isDog: this.state.isDog,
        isCat: this.state.isCat,
        isOther: this.state.isOther,
        hasCage: this.state.hasCage,
      };
      await this.props.driver.saveData(driver);
      if (!this.props.driver.error) {
        // this.refs.noti.success(getText(keys.channel.msgBodySuccess), getText(keys.component.complete));
        // history.push('/channel');
      } else {
        // this.refs.noti.error(this.props.channel.error, getText(keys.component.failed));
      }
    } catch (err) {
      // this.refs.noti.error(err.message, getText(keys.component.failed));
    }
  }

  gotoCancel = () => {
    console.log("======== gotoCancel");
    // history.push('/channel');
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
              <input type="checkbox" id="chkDog" value={this.state.isDog} onChange={event => this.setState({ isDog: event.target.value })} /> &nbsp;สุนัข
              &nbsp;&nbsp;&nbsp;
              <input type="checkbox" id="chkCat" value={this.state.isCat} onChange={event => this.setState({ isCat: event.target.value })} /> &nbsp;แมว
              &nbsp;&nbsp;&nbsp;
              <input type="checkbox" id="chkCat" value={this.state.isOther} onChange={event => this.setState({ isOther: event.target.value })} /> &nbsp;อื่นๆ
            </div>
            <div className="form-group" style={{ textAlign: 'center' }}>
              <input type="checkbox" id="chkCage"
                value={this.state.hasCage}
                onChange={event => this.setState({ hasCage: event.target.value })} />
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
