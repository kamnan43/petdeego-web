import { Component, Fragment } from 'react'

import Head from './Head';
import Footer from './Footer';
import Header from './Header';

import './DefaultLayout.scss';

class DefaultLayout extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <Fragment>
        <Head 
          title="เรียนภาษาจีนกับเหล่าซืออายะ - AYA Chinese"
          author="AYA Chinese"
        />
        <div className="wrapper" id="wrapper">
          <Header />
          {this.props.children}
        </div>
        <Footer />
      </Fragment>
    )
  }
}

export default DefaultLayout;