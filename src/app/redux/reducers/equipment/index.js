import {
  EQUIPMENT_REQUEST as T,
} from "../../actions/utilities";

import {
  GETEQUIPMENT,
  ADDEQUIPMENT,
  UPDATEEQUIPMENT,
  REMOVEEQUIPMENT,
} from "../../actions/equipment";

const initialState = {
  equipmentLoading: false,
  equipmentSuccess: false,
  equipmentFailure: false,
  equipmentError: null,
  equipment: [],

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

const equipmentReducer = (state = initialState, action) => {
  switch (action.type) {

    // SIMPLE REDUX ACTIONS
    case GETEQUIPMENT:
      return {
        ...state,
        equipment: action.payload,
      };

    case ADDEQUIPMENT:
      return {
        ...state,
        equipment: [...state.equipment, action.payload],
      };

    case UPDATEEQUIPMENT:
      return {
        ...state,
        equipment: state.equipment.map((item) =>
          item.id === action.payload.id
            ? action.payload
            : item
        ),
      };

    case REMOVEEQUIPMENT:
      return {
        ...state,
        equipment: state.equipment.filter(
          (item) => item.id !== action.payload
        ),
      };

    // API REQUEST ACTIONS
    case T.GET_EQUIPMENT_REQUEST:
      return {
        ...state,
        equipmentLoading: true,
        equipmentSuccess: false,
        equipmentFailure: false,
        equipmentError: null,
      };

    case T.GET_EQUIPMENT_SUCCESS:
      return {
        ...state,
        equipmentLoading: false,
        equipmentSuccess: true,
        equipment: action.payload,
      };

    case T.GET_EQUIPMENT_FAILURE:
      return {
        ...state,
        equipmentLoading: false,
        equipmentFailure: true,
        equipmentError: action.payload,
      };

    case T.ADD_EQUIPMENT_REQUEST:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addFailure: false,
        addError: null,
      };

    case T.ADD_EQUIPMENT_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        equipment: [...state.equipment, action.payload],
      };

    case T.ADD_EQUIPMENT_FAILURE:
      return {
        ...state,
        addLoading: false,
        addFailure: true,
        addError: action.payload,
      };

    case T.UPDATE_EQUIPMENT_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateFailure: false,
        updateError: null,
      };

    case T.UPDATE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        equipment: state.equipment.map((item) =>
          item.id === action.payload.id
            ? action.payload
            : item
        ),
      };

    case T.UPDATE_EQUIPMENT_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateFailure: true,
        updateError: action.payload,
      };

    case T.REMOVE_EQUIPMENT_REQUEST:
      return {
        ...state,
        removeLoading: true,
        removeSuccess: false,
        removeFailure: false,
        removeError: null,
      };

    case T.REMOVE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true,
        equipment: state.equipment.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case T.REMOVE_EQUIPMENT_FAILURE:
      return {
        ...state,
        removeLoading: false,
        removeFailure: true,
        removeError: action.payload,
      };

    default:
      return state;
  }
};

export default equipmentReducer;