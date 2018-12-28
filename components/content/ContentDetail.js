import { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react';
import { withRouter } from 'next/router'
import renderHTML from 'react-render-html';
import Link from 'next/link'

import ContentHeader from './ContentHeader';
import Contents from './Contents';

import { datetime } from '../../src/utils/datetime';
import { imageUrl } from '../../src/utils/url';

import style from './content.scss';

class ContentDetail extends Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    let { data } = this.props.content.toJS();
    let items = data.contents;
    return (
      <Fragment>
        <ContentHeader data={data} />
        <div className="page-blog-details pt--60 pb--45 bg--white">
          <div className="container">
            <div className="row">
              <div className="col-12 nopadding">
                <div className="blog-details content">
                  <article className="blog-post-details">
                    <div className="post_wrapper">
                      <div className="post_header">
                        <h1>{data.title}</h1>
                        <ul className="post_author">
                          <li>Posts by : <a href="#">{data.post_by ? data.post_by : 'AYA'}</a></li>
                          <li className="post-separator">/</li>
                          <li>{datetime.moment().format('DD MMM YYYY')}</li>
                        </ul>
                      </div>
                      {data.image_url &&
                        <div className="post-thumbnail">
                          <img src={imageUrl(data.image_url)} alt={data.title} />
                        </div>
                      }
                      <div className="post_content">
                        <Contents data={data} />
                        {/* {renderHTML(data.content)} */}
                      </div>
                      {/* <ul className="blog_meta">
                        <li><a href="#">3 comments</a></li>
                        <li> / </li>
                        <li>Tags:<span>fashion</span> <span>t-shirt</span> <span>white</span></li>
                      </ul> */}
                      {/* <ul className="social__net--4 d-flex justify-content-start" >
                        <li><a href="#"><i className="zmdi zmdi-rss" /></a></li>
                        <li><a href="#"><i className="zmdi zmdi-linkedin" /></a></li>
                        <li><a href="#"><i className="zmdi zmdi-vimeo" /></a></li>
                        <li><a href="#"><i className="zmdi zmdi-tumblr" /></a></li>
                        <li><a href="#"><i className="zmdi zmdi-google-plus" /></a></li>
                      </ul> */}
                    </div>
                  </article>
                </div>
              </div>
              <div style={{ display: 'none' }} className="col-lg-3 col-12 md-mt-40 sm-mt-40">
                <div className="wn__sidebar">
                  {/* Start Single Widget */}
                  <aside className="widget search_widget">
                    <h3 className="widget-title">Search</h3>
                    <form action="#">
                      <div className="form-input">
                        <input type="text" placeholder="Search..." />
                        <button><i className="fa fa-search" /></button>
                      </div>
                    </form>
                  </aside>
                  {/* End Single Widget */}
                  {/* Start Single Widget */}
                  <aside className="widget recent_widget">
                    <h3 className="widget-title">Recent</h3>
                    <div className="recent-posts">
                      <ul>
                        <li>
                          <div className="post-wrapper d-flex">
                            <div className="thumb">
                              <a href="blog-details.html"><img src="/static/assets/images/blog/sm-img/1.jpg" alt="blog images" /></a>
                            </div>
                            <div className="content">
                              <h4><a href="blog-details.html">Blog image post</a></h4>
                              <p>	March 10, 2015</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="post-wrapper d-flex">
                            <div className="thumb">
                              <a href="blog-details.html"><img src="/static/assets/images/blog/sm-img/2.jpg" alt="blog images" /></a>
                            </div>
                            <div className="content">
                              <h4><a href="blog-details.html">Post with Gallery</a></h4>
                              <p>	March 10, 2015</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="post-wrapper d-flex">
                            <div className="thumb">
                              <a href="blog-details.html"><img src="/static/assets/images/blog/sm-img/3.jpg" alt="blog images" /></a>
                            </div>
                            <div className="content">
                              <h4><a href="blog-details.html">Post with Video</a></h4>
                              <p>	March 10, 2015</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="post-wrapper d-flex">
                            <div className="thumb">
                              <a href="blog-details.html"><img src="/static/assets/images/blog/sm-img/4.jpg" alt="blog images" /></a>
                            </div>
                            <div className="content">
                              <h4><a href="blog-details.html">Maecenas ultricies</a></h4>
                              <p>	March 10, 2015</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="post-wrapper d-flex">
                            <div className="thumb">
                              <a href="blog-details.html"><img src="/static/assets/images/blog/sm-img/5.jpg" alt="blog images" /></a>
                            </div>
                            <div className="content">
                              <h4><a href="blog-details.html">Blog image post</a></h4>
                              <p>	March 10, 2015</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </aside>
                  {/* End Single Widget */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default inject('content')(observer(ContentDetail));