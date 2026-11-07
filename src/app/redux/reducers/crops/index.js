import { CROP_REQUEST as T } from "../../actions/utilities";
const INITIAL_STATE = {
  cropsLoading: false,
  cropsSuccess: false,
  cropsFailure: false,
  cropsError: null,
  crops: [],
  addLoading: false,
  addSuccess: false,
  addFailure: false,
  addError: null,
  updateLoading: false,
  updateSuccess: false,
  updateFailure: false,
  updateError: null,
  removeLoading: false,
  removeSuccess: false,
  removeFailure: false,
  removeError: null,
};
export const cropsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET CROPS
    case T.GET_CROPS_REQUEST:
      return {
        ...state,
        cropsLoading: true,
        cropsSuccess: false,
        cropsFailure: false,
        cropsError: null,
      };
    case T.GET_CROPS_SUCCESS:
      return {
        ...state,
        cropsLoading: false,
        cropsSuccess: true,
        cropsFailure: false,
        crops: action.payload,
      };
    case T.GET_CROPS_FAILURE:
      return {
        ...state,
        cropsLoading: false,
        cropsSuccess: false,
        cropsFailure: true,
        cropsError: action.payload,
      };
    // ADD CROP
    case T.ADD_CROP_REQUEST:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addFailure: false,
        addError: null,
      };
    case T.ADD_CROP_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        addFailure: false,
        crops: [...state.crops, action.payload],
      };
    case T.ADD_CROP_FAILURE:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addFailure: true,
        addError: action.payload,
      };
    // UPDATE CROP
    case T.UPDATE_CROP_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateFailure: false,
        updateError: null,
      };
    case T.UPDATE_CROP_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateFailure: false,
        crops: state.crops.map((crop) =>
          crop.id === action.payload.id
            ? { ...crop, ...action.payload }
            : crop
        ),
      };
    case T.UPDATE_CROP_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateFailure: true,
        updateError: action.payload,
      };
    // REMOVE CROP
    case T.REMOVE_CROP_REQUEST:
      return {
        ...state,
        removeLoading: true,
        removeSuccess: false,
        removeFailure: false,
        removeError: null,
      };
    case T.REMOVE_CROP_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true,
        removeFailure: false,
        crops: state.crops.filter(
          (crop) => crop.id !== action.payload.id
        ),
      };
    case T.REMOVE_CROP_FAILURE:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: false,
        removeFailure: true,
        removeError: action.payload,
      };
    default:
      return state;
  }
};
export default cropsReducer;