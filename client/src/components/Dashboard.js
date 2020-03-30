import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SurveyList from "./survey/SurveyList";

const Dashboard = props => {

  return (
    <div>
      <SurveyList />
      <div className='fixed-action-btn'>
        <Link to='/survey/new' className='btn-floating btn-large red'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    </div>
  )
};

const mapState = ({ auth }) => ({
  auth
})

export default connect(mapState,null)(Dashboard);