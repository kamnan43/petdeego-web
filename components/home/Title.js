import { Component, Fragment } from 'react'

export default class Title extends Component {
  render() {
    let data = this.props.data || {};
    if (data.title || data.desc) {
      return (
        <div className="container title__box">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title text-center">
                <h2 className="title__be--2">{data.title}<span className="color--theme">{data.title_color}</span></h2>
                <p>{data.desc}</p>
              </div>
            </div>
          </div>
          <div style={{ margin: 'auto', width: '35%' }}>
            <hr style={{ marginTop: 25, marginBottom: 5 }} />
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}
