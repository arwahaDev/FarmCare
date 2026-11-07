// User Action Types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const CREATEUSER = "CREATEUSER";
export const GETALLUSERS = "GETALLUSERS";
export const GETUSER = "GETUSER";
export const UPDATEUSER = "UPDATEUSER";
export const REMOVEUSER = "REMOVEUSER";

// Login Action
export const login = (user) => ({
  type: LOGIN,
  payload: user,
});

// Logout Action
export const logout = () => ({
  type: LOGOUT,
});

// Create User Action
export const createUser = (user) => ({
  type: CREATEUSER,
  payload: user,
});

// Get All Users Action
export const getAllUsers = (users) => ({
  type: GETALLUSERS,
  payload: users,
});

// Get Single User Action
export const getUser = (user) => ({
  type: GETUSER,
  payload: user,
});

// Update User Action
export const updateUser = (user) => ({
  type: UPDATEUSER,
  payload: user,
});

// Remove User Action
export const removeUser = (userId) => ({
  type: REMOVEUSER,
  payload: userId,
});