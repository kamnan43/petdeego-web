import { Component } from 'react'
import { observer, inject } from 'mobx-react';

import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';

import DefaultLayout from 'components/layout/DefaultLayout';
import ContentList from 'components/home/ContentList';

class Index extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    )
  }
}

export default inject('home')(observer(Index));
