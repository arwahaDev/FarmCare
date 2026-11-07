import { ACTIVITY_REQUEST as T } from "../../actions/utilities";
const initialState = {
  activityLoading: false,
  activitySuccess: false,
  activityFailure: false,
  activityError: null,
  activity: [],
  logLoading: false,
  logSuccess: false,
  logFailure: false,
  logError: null,
  clearLoading: false,
  clearSuccess: false,
  clearFailure: false,
  clearError: null,
};
const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.GET_ACTIVITY_REQUEST:
      return {
        ...state,
        activityLoading: true,
        activitySuccess: false,
        activityFailure: false,
        activityError: null,
      };
    case T.GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        activityLoading: false,
        activitySuccess: true,
        activity: action.payload,
      };
    case T.GET_ACTIVITY_FAILURE:
      return {
        ...state,
        activityLoading: false,
        activityFailure: true,
        activityError: action.payload,
      };
    case T.LOG_ACTIVITY_REQUEST:
      return {
        ...state,
        logLoading: true,
        logSuccess: false,
        logFailure: false,
        logError: null,
      };
    case T.LOG_ACTIVITY_SUCCESS:
      return {
        ...state,
        logLoading: false,
        logSuccess: true,
        activity: [action.payload, ...state.activity],
      };
    case T.LOG_ACTIVITY_FAILURE:
      return {
        ...state,
        logLoading: false,
        logFailure: true,
        logError: action.payload,
      };
    case T.CLEAR_ACTIVITY_REQUEST:
      return {
        ...state,
        clearLoading: true,
        clearSuccess: false,
        clearFailure: false,
        clearError: null,
      };
    case T.CLEAR_ACTIVITY_SUCCESS:
      return {
        ...state,
        clearLoading: false,
        clearSuccess: true,
        activity: [],
      };
    case T.CLEAR_ACTIVITY_FAILURE:
      return {
        ...state,
        clearLoading: false,
        clearFailure: true,
        clearError: action.payload,
      };
    default:
      return state;
  }
};
export default activityReducer;