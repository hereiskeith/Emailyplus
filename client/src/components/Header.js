import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

const Header = props => {

  const renderContent = () => {
    switch (props.auth) {
      case null:
        return;
      case false:
        return <li><a href="auth/google">Sign in with Google</a></li>
      default:
        // We can go with AJAX to let browser to make a faster logout
        return [
          <li key='payments'><Payments /></li>,
          <li key='credits' style={{ margin: '0 8px' }}>Credits: {props.auth.credit}</li>,
          <li key='logout'><a href="api/logout">Logout</a></li>
        ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link
          to={props.auth ? '/survey' : '/'}
          className="left brand-logo"
        >
          Emaily+
        </Link>
        <ul id="nav-mobile" className="right">
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