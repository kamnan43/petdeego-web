import { Component, Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import NextHead from 'next/head'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from './ImageHeader.scss';
import Title from './Title';
import { imageUrl } from '../../src/utils/url';
import LinkType from './LinkType';

export default class ImageHeader extends Component {
  constructor() {
    super();
  }

  render() {
    let { data } = this.props;
    let items = (data.items || []).map((item, index) => {
      return (
        <div key={index} className="ht__bradcaump__area" style={{ backgroundImage: `url(\'${imageUrl(item.image_url)}\')` }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bradcaump__inner text-center">
                  <h2 className="bradcaump-title" style={{ color: (item.title_font_color) ? item.title_font_color : 'inherit' }}>
                    {item.title}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <Fragment>
        {items}
      </Fragment>
    )
  }
}