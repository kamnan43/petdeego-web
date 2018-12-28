import { Component, Fragment } from 'react'
import renderHTML from 'react-render-html';
import YouTube from 'react-youtube';
import NextHead from 'next/head';
import ContactHeader from './ContactHeader';

export default class ContactPage extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <Fragment>
        <ContactHeader data={{}} />
      </Fragment>
    )
  }
}