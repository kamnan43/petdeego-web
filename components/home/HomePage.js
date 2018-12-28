import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';

class HomePage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>sss</div>
    );
  }
}

export default inject('home')(observer(HomePage));
