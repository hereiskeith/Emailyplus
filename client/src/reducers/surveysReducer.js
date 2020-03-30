import * as types from '../actions/types';

export default (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case types.FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}