import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from "../../actions/session";

const _nullSession = { _id: null, name: null }
export default (state = _nullSession, { type, user }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_CURRENT_USER:
      // console.log("loggedin", user)
      return user;
    case LOGOUT_CURRENT_USER:
      // console.log("not logged in")
      return _nullSession;
    default:
     //console.log("blank")
      return state;
  }
};