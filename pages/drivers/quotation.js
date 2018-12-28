import { Component } from 'react'
import { observer, inject } from 'mobx-react';

class Quotation extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        Driver Quotation!
      </div>
    )
  }
}

export default inject('home')(observer(Quotation));
