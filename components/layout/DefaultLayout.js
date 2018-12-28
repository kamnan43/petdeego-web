import { Component, Fragment } from 'react'

import Head from './Head';

import './styles/DefaultLayout.scss';

class DefaultLayout extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <Fragment>
        <Head title="" author="" />
        <div className="container-login100">
          <div className="wrap-login100">
            {this.props.children}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default DefaultLayout;