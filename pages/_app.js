import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import mobxStore from 'src/stores/store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
 
library.add(fas)

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider {...mobxStore} template={mobxStore.template}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    )
  }
}