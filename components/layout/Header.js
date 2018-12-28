import { Component } from 'react'
import MainMenu from './MainMenu';
import MainMenuMobile from './MainMenuMobile';


class Header extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <header id="wn__header" className="header__area header__absolute">
        <div className="container" >
          <MainMenu />
          <MainMenuMobile />
        </div>
      </header>
    )
  }
}

export default Header;