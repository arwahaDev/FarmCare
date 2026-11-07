import {
  GETATTENDANCE,
  MARKATTENDANCE,
  UPDATEATTENDANCE,
  REMOVEATTENDANCE,
} from "../../actions/attendance";

import { ATTENDANCE_REQUEST as T } from "../../actions/utilities";

const initialState = {
  records: [],
  attendance: [],

  attendanceLoading: false,
  attendanceSuccess: false,
  attendanceFailure: false,
  attendanceError: null,

  markLoading: false,
  markSuccess: false,
  markFailure: false,
  markError: null,

  updateLoading: false,
  updateSuccess: false,
  updateFailure: false,
  updateError: null,

  removeLoading: false,
  removeSuccess: false,
  removeFailure: false,
  removeError: null,
};

const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {

    case GETATTENDANCE:
    case T.GET_ATTENDANCE_SUCCESS:
      return {
        ...state,
        records: action.payload,
        attendance: action.payload,
        attendanceLoading: false,
        attendanceSuccess: true,
      };

    case MARKATTENDANCE:
    case T.MARK_ATTENDANCE_SUCCESS: {
      const updatedRecords = [...state.records, action.payload];

      return {
        ...state,
        records: updatedRecords,
        attendance: updatedRecords,
        markLoading: false,
        markSuccess: true,
      };
    }

    case UPDATEATTENDANCE:
    case T.UPDATE_ATTENDANCE_SUCCESS: {
      const updatedRecords = state.records.map((record) =>
        record.id === action.payload.id
          ? action.payload
          : record
      );

      return {
        ...state,
        records: updatedRecords,
        attendance: updatedRecords,
        updateLoading: false,
        updateSuccess: true,
      };
    }

    case REMOVEATTENDANCE:
      {
        const updatedRecords = state.records.filter(
          (record) => record.id !== action.payload
        );

        return {
          ...state,
          records: updatedRecords,
          attendance: updatedRecords,
        };
      }

    case T.REMOVE_ATTENDANCE_SUCCESS: {
      const updatedRecords = state.records.filter(
        (record) => record.id !== action.payload.id
      );

      return {
        ...state,
        records: updatedRecords,
        attendance: updatedRecords,
        removeLoading: false,
        removeSuccess: true,
      };
    }

    case T.GET_ATTENDANCE_REQUEST:
      return { ...state, attendanceLoading: true };

    case T.GET_ATTENDANCE_FAILURE:
      return {
        ...state,
        attendanceLoading: false,
        attendanceFailure: true,
        attendanceError: action.payload,
      };

    case T.MARK_ATTENDANCE_REQUEST:
      return { ...state, markLoading: true };

    case T.MARK_ATTENDANCE_FAILURE:
      return {
        ...state,
        markLoading: false,
        markFailure: true,
        markError: action.payload,
      };

    case T.UPDATE_ATTENDANCE_REQUEST:
      return { ...state, updateLoading: true };

    case T.UPDATE_ATTENDANCE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateFailure: true,
        updateError: action.payload,
      };

    case T.REMOVE_ATTENDANCE_REQUEST:
      return { ...state, removeLoading: true };

    case T.REMOVE_ATTENDANCE_FAILURE:
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

export default attendanceReducer;