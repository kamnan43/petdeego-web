import { Component } from 'react'
import { observer, inject } from 'mobx-react';

class Request extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        User Request!
      </div>
    )
  }
}

export default inject('home')(observer(Request));
