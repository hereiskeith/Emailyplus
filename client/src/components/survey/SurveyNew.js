import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from './surveyFormReview';

const SurveyNew = props => {
  const [showFormReview, setShowFormReview] = useState(false);

  const renderForm = () => {
    if(!showFormReview) {
      return <SurveyForm onSubmit={() => setShowFormReview(true)} />
    }
    return <SurveyFormReview onBack={() => setShowFormReview(false)}/>;
  }


  return (
    <div>
      {renderForm()}
    </div>
  )
};


export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);