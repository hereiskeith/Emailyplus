import React from 'react';
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import {Link} from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

const SurveyForm = props => {

  const renderField = () => {
    return (
      <div>
        {formFields.map(field => (
          <Field key={field.name} type="text" {...field} component={SurveyField} />
        ))}
      </div>
    )
  };


  return (
    <div>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {renderField()}
        <Link to='/survey' className='red btn-flat white-text'>
          Cancel
        </Link>

        <button type='submit' className='teal btn-flat right white-text'>
          Next
          <i className='material-icons right'>done</i>
        </button>
      </form>
    </div>
  )
};

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if(!values[name]) {
      errors[name] = 'You must provide a value'
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);