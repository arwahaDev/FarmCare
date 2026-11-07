import {
  getTasks,
  createTask,
  updateTask,
  removeTask,
} from "../../api/tasks";

import {
  REQUEST,
  SUCCESS,
  FAILURE,
  TASK_REQUEST,
} from "../utilities";

const T = TASK_REQUEST;

// GET ALL TASKS
export const GETALLTASKS = () => async (dispatch) => {
  dispatch(REQUEST(T.GET_TASKS_REQUEST));

  try {
    const response = await getTasks();

    if (!response.success) {
      dispatch(FAILURE(T.GET_TASKS_FAILURE, response.message));
      return;
    }

    dispatch(
      SUCCESS(T.GET_TASKS_SUCCESS, response.data)
    );
  } catch (error) {
    dispatch(
      FAILURE(T.GET_TASKS_FAILURE, error.message)
    );
  }
};

// CREATE TASK
export const CREATETASK =
  (data, moveToNext, failure) => async (dispatch) => {
    dispatch(REQUEST(T.ADD_TASK_REQUEST));

    try {
      const response = await createTask(data);

      if (!response.success) {
        dispatch(FAILURE(T.ADD_TASK_FAILURE, response.message));
        if (failure) failure(response.message);
        return;
      }

      dispatch(
        SUCCESS(T.ADD_TASK_SUCCESS, response.data)
      );

      if (moveToNext) moveToNext();
    } catch (error) {
      dispatch(
        FAILURE(T.ADD_TASK_FAILURE, error.message)
      );

      if (failure) failure(error.message);
    }
  };

// UPDATE TASK
export const UPDATETASK =
  (id, data, moveToNext, failure) => async (dispatch) => {
    dispatch(REQUEST(T.UPDATE_TASK_REQUEST));

    try {
      const response = await updateTask({
        ...data,
        id,
      });

      if (!response.success) {
        dispatch(FAILURE(T.UPDATE_TASK_FAILURE, response.message));
        if (failure) failure(response.message);
        return;
      }

      dispatch(
        SUCCESS(T.UPDATE_TASK_SUCCESS, response.data)
      );

      if (moveToNext) moveToNext();
    } catch (error) {
      dispatch(
        FAILURE(T.UPDATE_TASK_FAILURE, error.message)
      );

      if (failure) failure(error.message);
    }
  };

// DELETE TASK
export const REMOVETASK =
  (id, moveToNext, failure) => async (dispatch) => {
    dispatch(REQUEST(T.REMOVE_TASK_REQUEST));

    try {
      const response = await removeTask(id);

      if (!response.success) {
        dispatch(FAILURE(T.REMOVE_TASK_FAILURE, response.message));
        if (failure) failure(response.message);
        return;
      }

      dispatch(
        SUCCESS(T.REMOVE_TASK_SUCCESS, response.data)
      );

      if (moveToNext) moveToNext();
    } catch (error) {
      dispatch(
        FAILURE(T.REMOVE_TASK_FAILURE, error.message)
      );

      if (failure) failure(error.message);
    }
  };