const initialState = {
  list: [],
};
const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "alerts/set":
      return {
        ...state,
        list: action.payload,
      };
    case "alerts/add":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "alerts/remove":
      return {
        ...state,
        list: state.list.filter(
          (alert) => alert.id !== action.payload.id
        ),
      };
    case "alerts/clear":
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
};
export default alertsReducer;