import React from 'react';

const SurveyField = ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <lable>{label}</lable>
      <input {...input} style={{marginBottom: '5px'}}/>
      <div className='red-text' style={{marginBottom: '20px'}}>
        {touched && error ? error : <span>&nbsp;</span>}
      </div>
    </div>
  )
};

export default SurveyField;