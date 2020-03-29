import { combineReducers } from 'redux';
import { reducer as reduxFrom } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxFrom
});