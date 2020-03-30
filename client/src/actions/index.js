import axios from 'axios';
import * as types from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: types.FETCH_USER, payload: res.data })
  };

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/pay-with-stripe', token);

  dispatch({ type: types.FETCH_USER, payload: res.data })
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/survey', values);

  history.push('/survey');
  dispatch({ type: types.FETCH_USER, payload: res.data })
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/survey');

  dispatch({ type: types.FETCH_SURVEYS, payload: res.data })
}