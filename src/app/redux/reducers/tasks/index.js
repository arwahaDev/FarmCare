import { TASK_REQUEST as T } from "../../actions/utilities";

const INITIAL_STATE = {
  tasksLoading: false,
  tasksSuccess: false,
  tasksFailure: false,
  tasksError: null,

  tasks: [],

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

export const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // GET TASKS
    case T.GET_TASKS_REQUEST:
      return {
        ...state,
        tasksLoading: true,
        tasksError: null,
      };

    case T.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasksLoading: false,
        tasksSuccess: true,
        tasks: Array.isArray(action.payload)
          ? action.payload.filter(Boolean)
          : [],
      };

    case T.GET_TASKS_FAILURE:
      return {
        ...state,
        tasksLoading: false,
        tasksFailure: true,
        tasksError: action.payload,
      };

    // ADD TASK
    case T.ADD_TASK_REQUEST:
      return {
        ...state,
        addLoading: true,
        addError: null,
      };

    case T.ADD_TASK_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        tasks: [...state.tasks, action.payload],
      };

    case T.ADD_TASK_FAILURE:
      return {
        ...state,
        addLoading: false,
        addFailure: true,
        addError: action.payload,
      };

    // UPDATE TASK
    case T.UPDATE_TASK_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };

    case T.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        tasks: state.tasks.map((task) =>
          task && String(task.id) === String(action.payload.id)
            ? { ...task, ...action.payload }
            : task
        ),
      };

    case T.UPDATE_TASK_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateFailure: true,
        updateError: action.payload,
      };

    // DELETE TASK
    case T.REMOVE_TASK_REQUEST:
      return {
        ...state,
        removeLoading: true,
        removeError: null,
      };

    case T.REMOVE_TASK_SUCCESS:
      return {
        ...state,
        removeLoading: false,
        removeSuccess: true,
        tasks: state.tasks.filter(
          (task) =>
            task && String(task.id) !== String(action.payload.id)
        ),
      };

    case T.REMOVE_TASK_FAILURE:
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

export default tasksReducer;