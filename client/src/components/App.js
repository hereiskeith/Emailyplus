import React, { useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions/';
import Header from './Header';
import Landing from './Landing';
import Dashboard from "./Dashboard";
import SurveyNew from "./survey/SurveyNew";

const App = (props) => {
  const { fetchUser } = props;
  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <div>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route path='/' exact component={Landing} />
          <Route path='/survey' exact component={Dashboard} />
          <Route path='/survey/new' exact component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  )
};

export default connect(null, actions)(App);