import { ORDER_REQUEST as T } from "../../actions/utilities";
const INITIAL_STATE = {
  ordersLoading: false,
  ordersSuccess: false,
  ordersFailure: false,
  ordersError: null,
  orders: [],
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
export const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // GET ORDERS
    case T.GET_ORDERS_REQUEST:
      return {
        ...state,
        ordersLoading: true,
        ordersSuccess: false,
        ordersFailure: false,
        ordersError: null,
      };
    case T.GET_ORDERS_SUCCESS:
      return {
        ...state,
        ordersLoading: false,
        ordersSuccess: true,
        ordersFailure: false,
        orders: action.payload,
      };
    case T.GET_ORDERS_FAILURE:
      return {
        ...state,
        ordersLoading: false,
        ordersSuccess: false,
        ordersFailure: true,
        ordersError: action.payload,
      };
    // ADD ORDER
    case T.ADD_ORDER_REQUEST:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addFailure: false,
        addError: null,
      };
    case T.ADD_ORDER_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        addFailure: false,
        orders: [...state.orders, action.payload],
      };
    case T.ADD_ORDER_FAILURE:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addFailure: true,
        addError: action.payload,
      };
    // UPDATE ORDER
    case T.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateFailure: false,
        updateError: null,
      };
    case T.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateFailure: false,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? { ...order, ...action.payload }
            : order
        ),
      };
    case T.UPDATE_ORDER_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateFailure: true,
        updateError: action.payload,
      };
    // REMOVE ORDER
    case T.REMOVE_ORDER_REQUEST:
      return {
        ...state,
        removeLoading: true,
        removeSuccess: false,
        removeFailure: false,
        removeError: null,
      };
    case T.REMOVE_ORDER_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true,
        removeFailure: false,
        orders: state.orders.filter(
          (order) => order.id !== action.payload.id
        ),
      };
    case T.REMOVE_ORDER_FAILURE:
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
export default ordersReducer;