import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from "./formFields";
import * as actions from "../../actions/index";

const surveyFormReview = ({ onBack, formValues, submitSurvey, history }) => {

  const renderReview = () => {
    return formFields.map(({ name, label }) => {
      return (
        <div key={name}>
          <label>
            {label}
          </label>
          <div>
            {formValues[name]}
          </div>
        </div>
      )
    })
  }

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {renderReview()}
      <button className="yellow darken-3 btn-flat" onClick={onBack}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
};

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values
})


export default connect(mapStateToProps, actions)(withRouter(surveyFormReview));