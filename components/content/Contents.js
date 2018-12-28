import { Component, Fragment } from 'react'
import renderHTML from 'react-render-html';
import YouTube from 'react-youtube';
import NextHead from 'next/head';

export default class Contents extends Component {
  constructor() {
    super();
  }

  render() {
    let { data } = this.props;
    let contents = (data.contents || []).map((item, index) => {
      let content;
      switch (item.type) {
        case 'youtube':
          let size = 'offset-sm-2 col-sm-8 p-0';
          let height = '420';
          if (item.youtube_size === 'small') {
            size = 'offset-sm-4 col-sm-4 p-0';
            height = '210';
          } else if (item.youtube_size === 'medium') {
            size = 'offset-sm-3 col-sm-6 p-0';
            height = '320';
          }
          content = (
            <div className={`col-sm-12 text-center mt--40 nopadding`}>
              <div className={`${size} col-xs-12`}>
                <YouTube opts={{ width: '100%', height: height }} videoId={item.youtube_id} />
              </div>
            </div>
          )
          break;
        default:
          content = (
            <div className={`col-lg-12 col-sm-12 ql-container ql-snow nopadding`}>
              <div className={`ql-editor nopadding`}>
                {renderHTML(item.text)}
              </div>
            </div>
          )
          break;
      }
      return (
        <Fragment key={index}>
          {content}
        </Fragment>
      );
    });

    return (
      <Fragment>
        <NextHead>
          <link rel="stylesheet" href="/static/assets/css/plugins/quill.snow.css" />
        </NextHead>
        <section className="wn__product__area brown--color  pb--30">
          <div className="container">
            <div className="row">
              <div className={`col-md-12 col-sm-12 nopadding`}>
                {contents}
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}