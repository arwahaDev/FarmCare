import {
  LOGIN,
  LOGOUT,
  CREATEUSER,
  GETALLUSERS,
  GETUSER,
  UPDATEUSER,
  REMOVEUSER,
} from "../../actions/users";

// Get saved session
const getSavedSession = () => {
  try {
    const session = localStorage.getItem("agri_session");
    return session ? JSON.parse(session) : null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  users: [],
  currentUser: getSavedSession(),
  selectedUser: null,
  isAuthenticated: Boolean(getSavedSession()),
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };

    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        selectedUser: null,
        isAuthenticated: false,
      };

    case CREATEUSER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case GETALLUSERS:
      return {
        ...state,
        users: action.payload,
      };

    case GETUSER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    case UPDATEUSER:
      return {
        ...state,
        users: state.users.map((user) =>
          String(user.id) === String(action.payload.id)
            ? { ...user, ...action.payload }
            : user
        ),
        currentUser:
          String(state.currentUser?.id) === String(action.payload.id)
            ? { ...state.currentUser, ...action.payload }
            : state.currentUser,
      };

    case REMOVEUSER:
      return {
        ...state,
        users: state.users.filter(
          (user) => String(user.id) !== String(action.payload)
        ),
        selectedUser:
          String(state.selectedUser?.id) === String(action.payload)
            ? null
            : state.selectedUser,
      };

    default:
      return state;
  }
}

export default usersReducer;