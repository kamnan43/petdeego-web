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
        <div className="wrapper" id="wrapper">
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}

export default DefaultLayout;