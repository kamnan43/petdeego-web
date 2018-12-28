import { Component, Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import NextHead from 'next/head'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import style from './ImageCarousel.scss';
import Title from './Title';
import { imageUrl } from '../../src/utils/url';
import LinkType from './LinkType';

export default class ImageCarousel extends Component {
  constructor() {
    super();
  }

  render() {
    let { data } = this.props;
    let images = (data.items || []).map((item, index) => {
      return (
        <LinkType key={index} type={item.link_type.value} to={item.link_to}>
          <div>
            <img src={imageUrl(item.image_url)} />
          </div>
        </LinkType>
      );
    });
    return (
      <Fragment>
        <NextHead>
          <link rel="stylesheet" href="/static/assets/css/plugins/carousel.min.css" />
        </NextHead>
        <section className="wn__product__area brown--color bg--white pb--60 pt--60"
          style={{ backgroundColor: (data.bg_color) ? data.bg_color : 'inherit' }} >
          <Title data={data} />
          <div className={`container ${style.wrapper}`}>
            <div className="row">
              <div className="offset-lg-2 col-lg-8">
                <Carousel showArrows showStatus={false} showThumbs={false} autoPlay stopOnHover>
                  {images}
                </Carousel>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}