import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import DefaultLayout from '../../components/layout/DefaultLayout';

class Request extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <DefaultLayout>
          {/* <Servi */}
        </DefaultLayout>
      </Fragment>
    )
  }
}

export default inject('home')(observer(Request));
