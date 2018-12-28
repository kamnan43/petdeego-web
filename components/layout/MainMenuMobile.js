import { Component } from 'react';
import Link from 'next/link'

class MainMenuMobile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row mobile-menu d-block d-lg-none mean-container">
        <div className="col-lg-12 d-none">
          <nav className="mobilemenu__nav">
            <ul className="meninmenu">
              <li><Link href="/"><a>หน้าหลัก</a></Link></li>
              <li><Link href="/course"><a>คอร์สเรียนภาษาจีน</a></Link></li>
              <li><Link href="/university"><a>ข้อมูลมหาลัย</a></Link></li>
              <li><Link href="/review"><a>รีวิว</a></Link></li>
              <li><Link href="/"><a>ติดต่อเรา</a></Link></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default MainMenuMobile;