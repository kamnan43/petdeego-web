import { Component } from 'react'
import { observer, inject } from 'mobx-react';

class Index extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        Driver Index!
      </div>
    )
  }
}

export default inject('home')(observer(Index));
