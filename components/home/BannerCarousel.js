import { Component, Fragment } from 'react'
import $ from 'jquery';
import Carousel from 'react-image-carousel';
import { imageUrl } from '../../src/utils/url';

export default class BannerCarousel extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    $('.slide__activation').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      autoplay: false,
      autoplayTimeout: 10000,
      items: 1,
      navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
      dots: false,
      lazyLoad: true,
      responsive: {
        0: {
          items: 1
        },
        1920: {
          items: 1
        }
      }
    });
  }

  render() {
    let { data } = this.props;
    let contents = (data.items || []).map((item, index) => {
      return (
        <div key={index} className="slide animation__style08 bg-image--7 fullscreen align__center--left"
          style={{ backgroundImage: `url(\'${imageUrl(item.image_url)}\')` }} >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="slider__content">
                  <div className="contentbox">
                    <h2>{item.text1}<span>{item.text1_color}</span></h2>
                    <h2>{item.text2}<span>{item.text2_color}</span></h2>
                    <h2>{item.text3}<span>{item.text3_color}</span></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });
    return (
      <Fragment>
        <div className="slider-area brown__nav slider--15 slide__activation slide__arrow01 owl-carousel owl-theme">
          {contents}
        </div>
      </Fragment>
    )
  }
}