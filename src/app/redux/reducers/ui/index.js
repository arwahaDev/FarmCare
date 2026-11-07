const initialState = {
  theme: "light",
  toast: {
    show: false,
    message: "",
    type: "success",
  },
  sidebarOpen: true,
};
const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ui/toggle_theme":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case "ui/show_toast":
      return {
        ...state,
        toast: {
          show: true,
          message: action.payload.message,
          type: action.payload.type || "success",
        },
      };
    case "ui/hide_toast":
      return {
        ...state,
        toast: {
          ...state.toast,
          show: false,
        },
      };
    case "ui/toggle_sidebar":
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    default:
      return state;
  }
};
export default uiReducer;