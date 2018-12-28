import { Component, Fragment } from 'react'
import Link from 'next/link'

export default class LinkType extends Component {
  render() {
    const { type, to } = this.props;
    let result = <div />;
    switch (type) {
      case 'content':
        result = (
          <Link href={`/content?v=${to}`}>
            <a>{this.props.children}</a>
          </Link>
        );
        break;
      case 'url':
        result = (
          <Link href={to}>
            <a target="_blank">{this.props.children}</a>
          </Link>
        );
        break;
      case 'home':
        result = (
          <Link href="/">
            <a>{this.props.children}</a>
          </Link>
        );
        break;
      default:
        result = (
          <div>
            {this.props.children}
          </div>
        );
        break;
    }

    return result;
  }
}