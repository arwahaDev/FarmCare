// Attendance Action Types
export const GETATTENDANCE = "GETATTENDANCE";
export const MARKATTENDANCE = "MARKATTENDANCE";
export const UPDATEATTENDANCE = "UPDATEATTENDANCE";
export const REMOVEATTENDANCE = "REMOVEATTENDANCE";

// Get All Attendance
export const getAttendance = (records) => ({
  type: GETATTENDANCE,
  payload: records,
});

// Mark Attendance
export const markAttendance = (record) => ({
  type: MARKATTENDANCE,
  payload: record,
});

// Update Attendance
export const updateAttendance = (record) => ({
  type: UPDATEATTENDANCE,
  payload: record,
});

// Remove Attendance
export const removeAttendance = (id) => ({
  type: REMOVEATTENDANCE,
  payload: id,
});