import { INVENTORY_REQUEST as T } from "../../actions/utilities";

import {
  GETINVENTORY,
  ADDINVENTORY,
  UPDATEINVENTORY,
  REMOVEINVENTORY,
} from "../../actions/inventory";

const initialState = {
  inventoryLoading: false,
  inventorySuccess: false,
  inventoryFailure: false,
  inventoryError: null,
  inventory: [],
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
  usageLoading: false,
  usageSuccess: false,
  usageFailure: false,
  usageError: null,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {

    // Existing GET actions
    case T.GET_INVENTORY_REQUEST:
      return {
        ...state,
        inventoryLoading: true,
        inventorySuccess: false,
        inventoryFailure: false,
        inventoryError: null,
      };

    case T.GET_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryLoading: false,
        inventorySuccess: true,
        inventory: action.payload,
      };

    case T.GET_INVENTORY_FAILURE:
      return {
        ...state,
        inventoryLoading: false,
        inventoryFailure: true,
        inventoryError: action.payload,
      };

    // Existing ADD actions
    case T.ADD_ITEM_REQUEST:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addFailure: false,
        addError: null,
      };

    case T.ADD_ITEM_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        inventory: [...state.inventory, action.payload],
      };

    case T.ADD_ITEM_FAILURE:
      return {
        ...state,
        addLoading: false,
        addFailure: true,
        addError: action.payload,
      };

    // Existing UPDATE actions
    case T.UPDATE_ITEM_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateFailure: false,
        updateError: null,
      };

    case T.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        inventory: state.inventory.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case T.UPDATE_ITEM_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateFailure: true,
        updateError: action.payload,
      };

    // Existing REMOVE actions
    case T.REMOVE_ITEM_REQUEST:
      return {
        ...state,
        removeLoading: true,
        removeSuccess: false,
        removeFailure: false,
        removeError: null,
      };

    case T.REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true,
        inventory: state.inventory.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case T.REMOVE_ITEM_FAILURE:
      return {
        ...state,
        removeLoading: false,
        removeFailure: true,
        removeError: action.payload,
      };

    // Existing USAGE actions
    case T.ADD_USAGE_REQUEST:
      return {
        ...state,
        usageLoading: true,
        usageSuccess: false,
        usageFailure: false,
        usageError: null,
      };

    case T.ADD_USAGE_SUCCESS:
      return {
        ...state,
        usageLoading: false,
        usageSuccess: true,
        inventory: state.inventory.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case T.ADD_USAGE_FAILURE:
      return {
        ...state,
        usageLoading: false,
        usageFailure: true,
        usageError: action.payload,
      };

    // Plain Inventory actions
    case GETINVENTORY:
      return {
        ...state,
        inventory: action.payload,
      };

    case ADDINVENTORY:
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };

    case UPDATEINVENTORY:
      return {
        ...state,
        inventory: state.inventory.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case REMOVEINVENTORY:
      return {
        ...state,
        inventory: state.inventory.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default inventoryReducer;