import { Component, Fragment } from 'react'
import style from './NewsSlider.scss';

export default class NewsSlider extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <section className="wn__product__area brown--color pt--80 pb--30">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__title text-center">
                  <h2 className="title__be--2">New <span className="color--theme">Products</span></h2>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered lebmid alteration in some ledmid form</p>
                </div>
              </div>
            </div>
            <div className="border--round row mt--50">
              <div className="col-md-4 col-sm-12">
                <div className="product product__style--3">
                  <div className="product__thumb">
                    <a className="first__img" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <a className="second__img animation1" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <div className={style.title__box}>
                      เรียนจีน 3 อาทิตย์ เมืองต้าเหลียน 50,000 บาท พร้อมบิน
                    </div>
                    <div className="prize position__right__bottom d-flex">
                      <a href="#"><strong>ดูรายละเอียดเพิ่มเติม</strong></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="product product__style--3">
                  <div className="product__thumb">
                    <a className="first__img" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <a className="second__img animation1" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <div className={style.title__box}>
                      เรียนจีน 3 อาทิตย์ เมืองต้าเหลียน 50,000 บาท พร้อมบิน
                    </div>
                    <div className="prize position__right__bottom d-flex">
                      <a href="#"><strong>ดูรายละเอียดเพิ่มเติม</strong></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="product product__style--3">
                  <div className="product__thumb">
                    <a className="first__img" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <a className="second__img animation1" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <div className={style.title__box}>
                      เรียนจีน 3 อาทิตย์ เมืองต้าเหลียน 50,000 บาท พร้อมบิน
                    </div>
                    <div className="prize position__right__bottom d-flex">
                      <a href="#"><strong>ดูรายละเอียดเพิ่มเติม</strong></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Single Tab Content */}
            <div className="furniture--4 border--round arrows_style owl-carousel owl-theme row mt--50">
              {/* Start Single Product */}
              <div className={"product product__style--3 "}>
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="product__thumb">
                    <a className="first__img" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <a className="second__img animation1" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    {/* <div className="hot__box">
                      <span className="hot-label">BEST SALLER</span>
                    </div> */}
                    <div className={style.title__box}>
                      เรียนจีน 3 อาทิตย์ เมืองต้าเหลียน 50,000 บาท พร้อมบิน
                    </div>
                    <div className="prize position__right__bottom d-flex">
                      <a href="#"><strong>ดูรายละเอียดเพิ่มเติม</strong></a>
                    </div>
                  </div>
                  {/* <div className="product__content content--center">
                    // <h4><a href="single-product.html">robin parrish</a></h4>
                  </div> */}
                </div>
              </div>
              {/* Start Single Product */}
              {/* Start Single Product */}
              <div className="product product__style--3">
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="product__thumb">
                    <a className="first__img" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <a className="second__img animation1" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    {/* <div className="hot__box color--2">
                      <span className="hot-label">HOT</span>
                    </div> */}
                    <div className={style.title__box}>
                      เรียนจีน 3 อาทิตย์ เมืองต้าเหลียน 50,000 บาท พร้อมบิน
                    </div>
                    <div className="prize position__right__bottom d-flex">
                      <a href="#"><strong>ดูรายละเอียดเพิ่มเติม</strong></a>
                    </div>
                  </div>
                  <div className="product__content content--center">
                    {/* <h4><a href="single-product.html">The Remainng</a></h4> */}
                    {/* <ul className="prize d-flex">
                      <li>$35.00</li>
                      <li className="old_prize">$35.00</li>
                    </ul> */}
                    {/* <div className="action">
                      <div className="actions_inner">
                        <ul className="add_to_links">
                          <li><a className="cart" href="cart.html"><i className="bi bi-shopping-bag4" /></a></li>
                          <li><a className="wishlist" href="wishlist.html"><i className="bi bi-shopping-cart-full" /></a></li>
                          <li><a className="compare" href="#"><i className="bi bi-heart-beat" /></a></li>
                          <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" href="#productmodal"><i className="bi bi-search" /></a></li>
                        </ul>
                      </div>
                    </div> */}
                    {/* <div className="product__hover--content">
                      <ul className="rating d-flex">
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Start Single Product */}
              {/* Start Single Product */}
              <div className="product product__style--3">
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="product__thumb">
                    <a className="first__img" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <a className="second__img animation1" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    {/* <div className="hot__box">
                      <span className="hot-label">BEST SALLER</span>
                    </div> */}
                    <div className={style.title__box}>
                      เรียนจีน 3 อาทิตย์ เมืองต้าเหลียน 50,000 บาท พร้อมบิน
                    </div>
                    <ul className="prize position__right__bottom d-flex">
                      <li>ดูรายละเอียดเพิ่มเติม</li>
                    </ul>
                  </div>
                  <div className="product__content content--center">
                    {/* <h4><a href="single-product.html">Bowen Greenwood</a></h4> */}
                    {/* <ul className="prize d-flex">
                      <li>$40.00</li>
                      <li className="old_prize">$35.00</li>
                    </ul> */}
                    {/* <div className="action">
                      <div className="actions_inner">
                        <ul className="add_to_links">
                          <li><a className="cart" href="cart.html"><i className="bi bi-shopping-bag4" /></a></li>
                          <li><a className="wishlist" href="wishlist.html"><i className="bi bi-shopping-cart-full" /></a></li>
                          <li><a className="compare" href="#"><i className="bi bi-heart-beat" /></a></li>
                          <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" href="#productmodal"><i className="bi bi-search" /></a></li>
                        </ul>
                      </div>
                    </div> */}
                    {/* <div className="product__hover--content">
                      <ul className="rating d-flex">
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Start Single Product */}
              {/* Start Single Product */}
              <div className="product product__style--3">
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="product__thumb">
                    <a className="first__img" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <a className="second__img animation1" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    {/* <div className="hot__box">
                      <span className="hot-label">HOT</span>
                    </div> */}
                    <div className={style.title__box}>
                      เรียนจีน 3 อาทิตย์ เมืองต้าเหลียน 50,000 บาท พร้อมบิน
                    </div>
                    <ul className="prize position__right__bottom d-flex">
                      <li>ดูรายละเอียดเพิ่มเติม</li>
                    </ul>
                  </div>
                  <div className="product__content content--center">
                    {/* <h4><a href="single-product.html">Lando</a></h4> */}
                    {/* <ul className="prize d-flex">
                      <li>$35.00</li>
                      <li className="old_prize">$50.00</li>
                    </ul> */}
                    {/* <div className="action">
                      <div className="actions_inner">
                        <ul className="add_to_links">
                          <li><a className="cart" href="cart.html"><i className="bi bi-shopping-bag4" /></a></li>
                          <li><a className="wishlist" href="wishlist.html"><i className="bi bi-shopping-cart-full" /></a></li>
                          <li><a className="compare" href="#"><i className="bi bi-heart-beat" /></a></li>
                          <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" href="#productmodal"><i className="bi bi-search" /></a></li>
                        </ul>
                      </div>
                    </div> */}
                    {/* <div className="product__hover--content">
                      <ul className="rating d-flex">
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Start Single Product */}
              {/* Start Single Product */}
              <div className="product product__style--3">
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="product__thumb">
                    <a className="first__img" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <a className="second__img animation1" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    {/* <div className="hot__box">
                      <span className="hot-label">HOT</span>
                    </div> */}
                    <div className={style.title__box}>
                      เรียนจีน 3 อาทิตย์ เมืองต้าเหลียน 50,000 บาท พร้อมบิน
                    </div>
                    <ul className="prize position__right__bottom d-flex">
                      <li>ดูรายละเอียดเพิ่มเติม</li>
                    </ul>
                  </div>
                  <div className="product__content content--center">
                    {/* <h4><a href="single-product.html">Doctor Wldo</a></h4> */}
                    {/* <ul className="prize d-flex">
                      <li>$35.00</li>
                      <li className="old_prize">$35.00</li>
                    </ul> */}
                    {/* <div className="action">
                      <div className="actions_inner">
                        <ul className="add_to_links">
                          <li><a className="cart" href="cart.html"><i className="bi bi-shopping-bag4" /></a></li>
                          <li><a className="wishlist" href="wishlist.html"><i className="bi bi-shopping-cart-full" /></a></li>
                          <li><a className="compare" href="#"><i className="bi bi-heart-beat" /></a></li>
                          <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" href="#productmodal"><i className="bi bi-search" /></a></li>
                        </ul>
                      </div>
                    </div> */}
                    {/* <div className="product__hover--content">
                      <ul className="rating d-flex">
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Start Single Product */}
              {/* Start Single Product */}
              <div className="product product__style--3">
                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <div className="product__thumb">
                    <a className="first__img" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    <a className="second__img animation1" href="single-product.html"><img src="/static/assets/images/books/1-1.jpg" alt="product image" /></a>
                    {/* <div className="hot__box">
                      <span className="hot-label">BEST SALER</span>
                    </div> */}
                    <div className={style.title__box}>
                      เรียนจีน 3 อาทิตย์ เมืองต้าเหลียน 50,000 บาท พร้อมบิน
                    </div>
                    <ul className="prize position__right__bottom d-flex">
                      <li>ดูรายละเอียดเพิ่มเติม</li>
                    </ul>
                  </div>
                  <div className="product__content content--center content--center">
                    {/* <h4><a href="single-product.html">Ghost</a></h4> */}
                    {/* <ul className="prize d-flex">
                      <li>$50.00</li>
                      <li className="old_prize">$35.00</li>
                    </ul> */}
                    {/* <div className="action">
                      <div className="actions_inner">
                        <ul className="add_to_links">
                          <li><a className="cart" href="cart.html"><i className="bi bi-shopping-bag4" /></a></li>
                          <li><a className="wishlist" href="wishlist.html"><i className="bi bi-shopping-cart-full" /></a></li>
                          <li><a className="compare" href="#"><i className="bi bi-heart-beat" /></a></li>
                          <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" href="#productmodal"><i className="bi bi-search" /></a></li>
                        </ul>
                      </div>
                    </div> */}
                    {/* <div className="product__hover--content">
                      <ul className="rating d-flex">
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li className="on"><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                        <li><i className="fa fa-star-o" /></li>
                      </ul>
                    </div> */}
                  </div>
                </div>
                {/* Start Single Product */}
              </div>
            </div>
            {/* End Single Tab Content */}
          </div>
        </section>
      </Fragment>
    )
  }
}