import { BUYER_REQUEST as T } from "../../actions/utilities";
const INITIAL_STATE = {
  buyersLoading: false,
  buyersSuccess: false,
  buyersFailure: false,
  buyersError: null,
  buyers: [],
  saveLoading: false,
  saveSuccess: false,
  saveFailure: false,
  saveError: null,
  updateLoading: false,
  updateSuccess: false,
  updateFailure: false,
  updateError: null,
  removeLoading: false,
  removeSuccess: false,
  removeFailure: false,
  removeError: null,
};
export const buyersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET BUYERS
    case T.GET_BUYERS_REQUEST:
      return {
        ...state,
        buyersLoading: true,
        buyersSuccess: false,
        buyersFailure: false,
        buyersError: null,
      };
    case T.GET_BUYERS_SUCCESS:
      return {
        ...state,
        buyersLoading: false,
        buyersSuccess: true,
        buyersFailure: false,
        buyers: action.payload,
      };
    case T.GET_BUYERS_FAILURE:
      return {
        ...state,
        buyersLoading: false,
        buyersSuccess: false,
        buyersFailure: true,
        buyersError: action.payload,
      };
    // SAVE BUYER
    case T.SAVE_BUYER_REQUEST:
      return {
        ...state,
        saveLoading: true,
        saveSuccess: false,
        saveFailure: false,
        saveError: null,
      };
    case T.SAVE_BUYER_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveSuccess: true,
        saveFailure: false,
        buyers: [...state.buyers, action.payload],
      };
    case T.SAVE_BUYER_FAILURE:
      return {
        ...state,
        saveLoading: false,
        saveSuccess: false,
        saveFailure: true,
        saveError: action.payload,
      };
    // UPDATE BUYER
    case T.UPDATE_BUYER_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateFailure: false,
        updateError: null,
      };
    case T.UPDATE_BUYER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateFailure: false,
        buyers: state.buyers.map((buyer) =>
          buyer.id === action.payload.id
            ? { ...buyer, ...action.payload }
            : buyer
        ),
      };
    case T.UPDATE_BUYER_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateFailure: true,
        updateError: action.payload,
      };
    // REMOVE BUYER
    case T.REMOVE_BUYER_REQUEST:
      return {
        ...state,
        removeLoading: true,
        removeSuccess: false,
        removeFailure: false,
        removeError: null,
      };
    case T.REMOVE_BUYER_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true,
        removeFailure: false,
        buyers: state.buyers.filter(
          (buyer) => buyer.id !== action.payload.id
        ),
      };
    case T.REMOVE_BUYER_FAILURE:
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
export default buyersReducer;