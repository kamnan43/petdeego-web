import { Component } from 'react'
import { observer, inject } from 'mobx-react';

class Register extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        Driver Register!
      </div>
    )
  }
}

export default inject('home')(observer(Register));
