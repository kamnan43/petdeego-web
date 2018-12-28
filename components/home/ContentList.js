import { Component } from 'react'

import BannerCarousel from 'components/home/BannerCarousel';
import ThreeColumn from 'components/home/ThreeColumn';
import ImageCarousel from 'components/home/ImageCarousel';
import ImageHeader from 'components/home/ImageHeader';
import NewsList from 'components/home/NewsList';
import FreeText from 'components/home/FreeText';

export default class ContentList extends Component {
  render() {
    let contents = (this.props.list || []).map((item, index) => {
      let content;
      switch (item.type) {
        case 'banner-carousel':
          content = (<BannerCarousel data={item.data} {...this.props} />);
          break;
        case 'three-column':
          content = (<ThreeColumn data={item.data} {...this.props} />);
          break;
        case 'news-list':
          content = (<NewsList data={item.data} {...this.props} />);
          break;
        case 'image-carousel':
          content = (<ImageCarousel data={item.data} {...this.props} />);
          break;
        case 'image-header':
          content = (<ImageHeader data={item.data} {...this.props} />);
          break;
        case 'free-text':
          content = (<FreeText data={item.data} {...this.props} />);
          break;
        default:
          content = <div />;
          break;
      }
      return (
        <div key={index}>
          {content}
        </div>
      );
    });
    return (contents);
  }
}