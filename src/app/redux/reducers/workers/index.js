import {
  GETWORKERS,
  ADDWORKER,
  UPDATEWORKER,
  REMOVEWORKER,
} from "../../actions/workers";

import { WORKER_REQUEST as T } from "../../actions/utilities";

const initialState = {
  workersLoading: false,
  workersSuccess: false,
  workersFailure: false,
  workersError: null,
  workers: [],
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

const workersReducer = (state = initialState, action) => {
  switch (action.type) {

    // Plain Redux actions
    case GETWORKERS:
      return {
        ...state,
        workers: action.payload,
      };

    case ADDWORKER:
      return {
        ...state,
        workers: [...state.workers, action.payload],
      };

    case UPDATEWORKER:
      return {
        ...state,
        workers: state.workers.map((worker) =>
          worker.id === action.payload.id
            ? action.payload
            : worker
        ),
      };

    case REMOVEWORKER:
      return {
        ...state,
        workers: state.workers.filter(
          (worker) => worker.id !== action.payload
        ),
      };

    // Async GET actions
    case T.GET_WORKERS_REQUEST:
      return {
        ...state,
        workersLoading: true,
        workersFailure: false,
      };

    case T.GET_WORKERS_SUCCESS:
      return {
        ...state,
        workersLoading: false,
        workersSuccess: true,
        workers: action.payload,
      };

    case T.GET_WORKERS_FAILURE:
      return {
        ...state,
        workersLoading: false,
        workersFailure: true,
        workersError: action.payload,
      };

    // Async ADD actions
    case T.ADD_WORKER_REQUEST:
      return { ...state, addLoading: true };

    case T.ADD_WORKER_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        workers: [...state.workers, action.payload],
      };

    case T.ADD_WORKER_FAILURE:
      return {
        ...state,
        addLoading: false,
        addFailure: true,
        addError: action.payload,
      };

    // Async UPDATE actions
    case T.UPDATE_WORKER_REQUEST:
      return { ...state, updateLoading: true };

    case T.UPDATE_WORKER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        workers: state.workers.map((worker) =>
          worker.id === action.payload.id
            ? action.payload
            : worker
        ),
      };

    case T.UPDATE_WORKER_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateFailure: true,
        updateError: action.payload,
      };

    // Async REMOVE actions
    case T.REMOVE_WORKER_REQUEST:
      return { ...state, removeLoading: true };

    case T.REMOVE_WORKER_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true,
        workers: state.workers.filter(
          (worker) => worker.id !== action.payload.id
        ),
      };

    case T.REMOVE_WORKER_FAILURE:
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

export default workersReducer;