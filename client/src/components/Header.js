import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = props => {

  const renderContent = () => {
    switch (props.auth) {
      case null:
        return;
      case false:
        return <li><a href="auth/google">Sign in with Google</a></li>
      default:
        // We can go with AJAX to let browser to make a faster logout
        return <li><a href="api/logout">Logout</a></li>
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link
          to={props.auth ? '/survey' : '/'}
          className="brand-logo"
        >
          Emaily+
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderContent()}
        </ul>
      </div>
    </nav>
  )
};

const mapState = ({ auth }) => ({
  auth
})

export default connect(mapState,null)(Header);