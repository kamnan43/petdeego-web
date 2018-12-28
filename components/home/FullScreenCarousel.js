import { Component, Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';

export default class FullScreenCarousel extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <Carousel showArrows showStatus={false} showThumbs={false} autoPlay stopOnHover>
            <div>
              <img src="/static/assets/images/bg/1.jpg" />
              {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
              <img src="/static/assets/images/bg/1.jpg" />
              {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
              <img src="/static/assets/images/bg/1.jpg" />
              {/* <p className="legend">Legend 3</p> */}
            </div>
            <div>
              <img src="/static/assets/images/bg/1.jpg" />
              {/* <p className="legend">Legend 4</p> */}
            </div>
            <div>
              <img src="/static/assets/images/bg/1.jpg" />
              {/* <p className="legend">Legend 5</p> */}
            </div>
            <div>
              <img src="/static/assets/images/bg/1.jpg" />
              {/* <p className="legend">Legend 6</p> */}
            </div>
          </Carousel>
        </div>
      </div>
    )
  }
}