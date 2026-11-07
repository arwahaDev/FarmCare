import axios from "axios";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const LATITUDE = 32.1877;
const LONGITUDE = 74.1945;

export async function getWeather() {
  const response = await axios.get(WEATHER_URL, {
    params: {
      latitude: LATITUDE,
      longitude: LONGITUDE,

      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "weather_code",
        "wind_speed_10m",
      ].join(","),

      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "weather_code",
      ].join(","),

      timezone: "Asia/Karachi",
      forecast_days: 5,
    },
  });
  return response.data;
}