import { FETCHWEATHER } from "../../actions/weather";

const INITIAL_STATE = {
  data: null,
  status: "idle",
  error: null,
  lastUpdated: null,
};

export const weatherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // WEATHER REQUEST STARTED
    case FETCHWEATHER.pending.type:
      return {
        ...state,
        status: "loading",
        error: null,
      };

    // WEATHER REQUEST SUCCESSFUL
    case FETCHWEATHER.fulfilled.type:
      return {
        ...state,
        status: "succeeded",
        data: action.payload,
        error: null,
        lastUpdated: new Date().toISOString(),
      };

    // WEATHER REQUEST FAILED
    case FETCHWEATHER.rejected.type:
      return {
        ...state,
        status: "failed",
        error:
          action.payload ||
          action.error?.message ||
          "Failed to fetch weather data",
      };

    default:
      return state;
  }
};

export default weatherReducer;