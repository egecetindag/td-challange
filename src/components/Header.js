import { Link } from 'react-router-dom';
import '../assets/styles/header.less'

function Header() {
    return (
      <div className="header">
          <div className="hide"/>
          <div className="header-title">Cats <img alt="paw" className="paw" src="pawprint.png"/> </div>
          {window.location.pathname === "/" && <Link to="/upload" className="header-nav"> Upload a Cat</Link>}
          {window.location.pathname === "/upload" && <Link to="/" className="header-nav">Home</Link>}
      </div>
    );
  }
  
  export default Header;
  