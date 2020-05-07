import { RECEIVE_CURRENT_USER } from "../../actions/session";
import { CLEAR_ERRORS, RECEIVE_ERRORS } from "../../actions/error";

export default (state = "", { type, message }) => {
  Object.freeze(state);
  switch (type) {
    case RECEIVE_ERRORS:
      // console.log("msg", message)
      return message;
    case RECEIVE_CURRENT_USER:
    case CLEAR_ERRORS:
      return "";
    default:
      return state;
  }
};
