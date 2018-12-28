import { Component } from 'react'
import style from './Error404.scss';

export default class Error404 extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className={`page-blog-details pt--60 pb--45 bg--white ${style.error404}`}>
        <div className="container">
          <div className="row">
            <div className={`col-12 ${style.content}`}>
              404 Not Found
          </div>
          </div>
        </div>
      </div>
    )
  }
}

