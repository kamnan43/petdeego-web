import { Component, Fragment } from 'react'
import DefaultLayout from '../components/layout/DefaultLayout';
import HomePage from '../components/home/HomePage';

class Request extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // require('../src/utils/VConsole');
    const liffHelper = require('../src/utils/Liffhelper');
    liffHelper.default.getProfile()
      .then(profile => {
        console.log(profile);
      });
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

export default Request;
