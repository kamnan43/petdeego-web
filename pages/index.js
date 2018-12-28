import { Component } from 'react'
import { observer, inject } from 'mobx-react';

import DefaultLayout from 'components/layout/DefaultLayout';
import ContentList from 'components/home/ContentList';

class Index extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        Hi!!!
      </div>
    )
  }
}

export default inject('home')(observer(Index));
