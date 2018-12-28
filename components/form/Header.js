import { Component, Fragment } from 'react'

class Header extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="login100-form-title" style={{ backgroundImage: 'url(/static/assets/images/petdeego/bg.jpg)' }}>
        <span className="login100-form-title-1">
          {this.props.title}
        </span>
      </div>
    )
  }
}

export default Header;