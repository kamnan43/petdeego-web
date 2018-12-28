import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
  render() {
    return (
      <html lang="th">
        <Head>
          <base href="/" />
          <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="content-language" content="th, en" />
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <meta name="robots" content="all" />
          <link rel="icon" type="image/png" href="/static/images/icon.png" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.2.0/vconsole.min.js" />
          <script src="/static/js/common.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}