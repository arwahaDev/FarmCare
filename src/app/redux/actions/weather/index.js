import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../../api/weather";
export const FETCHWEATHER = createAsyncThunk(
  "weather/fetchWeather",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWeather();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch weather data"
      );
    }
  }
);