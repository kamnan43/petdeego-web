import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import DefaultLayout from '../components/layout/DefaultLayout';
import HomePage from '../components/home/HomePage';

class Request extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <DefaultLayout>
          <HomePage />
        </DefaultLayout>
      </Fragment>
    )
  }
}

export default inject('home')(observer(Request));
