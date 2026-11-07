import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCHWEATHER } from "../app/redux/actions/weather/index";
import StatCard from "../components/common/StatCard";
import HumidityGauge from "../components/dashboard/HumidityGauge";
import CropHealthList from "../components/dashboard/CropHealthList";
import CropHealthChart from "../components/dashboard/CropHealthChart";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import HarvestSummary from "../components/harvest/HarvestSummary";
import OrdersSummary from "../components/harvest/OrdersSummary";
import HarvestChart from "../components/harvest/HarvestChart";
import WorkerforceCard from "../components/dashboard/WorkforceCard";
import ServiceDuePanel from "../components/dashboard/ServiceDuePanel";
// import AttendanceChart from "../components/dashboard/AttendanceChart";s
import {
  selectProfitByCrop,
  selectLowStock,
  selectDueCrops,
} from "../app/redux/selectors";
import { getWeatherDescription } from "../services/weatherService";
import EquipmentStats from "../components/dashboard/EquipmentStatusCard";
import AttendanceChart from "../components/dashboard/AttendanceChart";
export default function Dashboard() {
  const dispatch = useDispatch();
  // Redux data
  const crops = useSelector(
    (state) => state.crops?.crops ?? []
  );
  const buyers = useSelector(
    (state) => state.buyers?.buyers ?? []
  );
  const orders = useSelector(
    (state) => state.orders?.orders ?? []
  );
  const weather = useSelector( (state) => state.weather ?? {});
  const weatherData = weather?.data;
  const weatherLoading = weather?.status === "loading" 
  const weatherError = weather?.error;
  const lastUpdated = weather?.lastUpdated;
  const lowStockCrops = useSelector(selectLowStock);
  const dueCrops = useSelector(selectDueCrops);
  const profitRows = useSelector(selectProfitByCrop);
  // Local state
  const [refreshing, setRefreshing] = useState(false);

  // Support both Open-Meteo raw data and normalized Redux data
  // Read Current Weather
const current = useMemo(() => {
  if (weatherData?.current) {
    return weatherData.current;
  }

  if (weather.current) {
    return weather.current;
  }

  if (
    weather.temp !== undefined ||
    weather.temperature !== undefined
  ) {
    return {
      temperature_2m: weather.temp ?? weather.temperature,
      relative_humidity_2m: weather.humidity,
      wind_speed_10m: weather.wind,
      weather_code: weather.weatherCode ?? weather.weather_code,
    };
  }

  return null;
}, [weatherData, weather]);

// Read 5-Day Forecast
const daily = useMemo(() => {
  if (weatherData?.daily) {
    return weatherData.daily;
  }

  if (weather.daily) {
    return weather.daily;
  }

  if (Array.isArray(weather.forecast)) {
    return {
      time: weather.forecast.map(day => day.date),
      weather_code: weather.forecast.map(
        day => day.weatherCode ?? day.weather_code ?? 0
      ),
      temperature_2m_max: weather.forecast.map(
        day => day.maxTemp ?? day.temperatureMax ?? 0
      ),
      temperature_2m_min: weather.forecast.map(
        day => day.minTemp ?? day.temperatureMin ?? 0
      ),
      precipitation_probability_max: weather.forecast.map(
        day => day.rainChance ?? day.precipitationProbability ?? 0
      ),
      wind_speed_10m_max: weather.forecast.map(
        day => day.maxWind ?? day.windSpeed ?? 0
      ),
    };
  }

  return null;
}, [weatherData, weather]);

 
  

  // Weather refresh
  const loadWeather = async () => {
    setRefreshing(true);

    try {
      await dispatch(FETCHWEATHER()).unwrap();
    } catch (error) {
      console.error("Weather fetch failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Initial fetch and automatic refresh every 15 minutes
  useEffect(() => {
    loadWeather();

    const intervalId = setInterval(() => {
      loadWeather();
    }, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Dashboard calculations
  const totalHarvested = crops.reduce(
    (total, crop) =>
      total + Number(crop.harvestQty ?? 0),
    0
  );

  const totalSold = orders.reduce(
    (total, order) =>
      total + Number(order.quantity ?? 0),
    0
  );

  const totalRemaining = Math.max(
    totalHarvested - totalSold,
    0
  );

  const getCropProfit = (cropId) => {
    if (Array.isArray(profitRows)) {
      const row = profitRows.find(
        (item) =>
          String(item.cropId ?? item.id) === String(cropId)
      );

      return Number(row?.profit ?? 0);
    }

    return Number(
      profitRows?.[cropId]?.profit ?? 0
    );
  };

  const getCropName = (cropId) => {
    const crop = crops.find(
      (item) => String(item.id) === String(cropId)
    );

    return crop?.name ?? "Unknown Crop";
  };

  // Weather alert calculations
  const weatherAlerts = [];

  if (current) {
    if (Number(current.temperature_2m) >= 38) {
      weatherAlerts.push(
        "High temperature: Check crops and irrigation needs."
      );
    }

    if (Number(current.wind_speed_10m) >= 35) {
      weatherAlerts.push(
        "Strong winds: Check crops and farm equipment."
      );
    }

    if (
      Number(daily?.precipitation_probability_max?.[0] ?? 0) >= 70
    ) {
      weatherAlerts.push(
        "High rain probability: Review your farm activities."
      );
    }
  }

  const weatherDescription = current?.weather_code !== undefined
    ? getWeatherDescription(current.weather_code)
    : "Weather information unavailable";

  const formatDate = (date) => {
    if (!date) return "Not scheduled";

    return new Date(`${date}T12:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatTime = (date) => {
    if (!date) return "Not updated yet";

    return new Date(date).toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="farm-dashboard">

      {/* HERO SECTION */}
      <section className="dashboard-hero">

        <div>
          <span className="dashboard-eyebrow">
            AGRICULTURE MANAGEMENT SYSTEM
          </span>

          <h1>Farm Dashboard</h1>

          <p>
            Monitor your crops, weather, harvest, sales and farm activities.
          </p>
        </div>

        <div className="farm-status">
          <span className="status-dot"></span>
          Farm Status: Active
        </div>

      </section>

      {/* WEATHER REFRESH */}
      <section className="weather-toolbar">

        <div>
          <h3>Live Farm Weather</h3>

          <p>
            Gujranwala, Pakistan
          </p>
        </div>

        <div className="weather-refresh-area">

          <span className="weather-updated">
            Last updated: {formatTime(lastUpdated)}
          </span>

          <button
            className="weather-refresh-btn"
            onClick={()=>dispatch(FETCHWEATHER())}
            disabled={weatherLoading}
          >
            { weatherLoading
              ? "Refreshing..."
              : "Refresh Weather"}
          </button>

        </div>

      </section>

      {/* WEATHER ERROR */}
      {weatherError && (
        <div className="alert alert-danger">
          {typeof weatherError === "string"
            ? weatherError
            : weatherError.message ?? "Unable to load weather data."}

          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={loadWeather}
          >
            Try Again
          </button>
        </div>
      )}

      {/* WEATHER LOADING */}
      {weatherLoading && (
        <div className="dashboard-loading">
          Loading live weather data...
        </div>
      )}

      {/* CURRENT WEATHER */}
      {current && (
        <section className="weather-grid">

          <div className="weather-card temperature-card">
            <span className="weather-card-label">
              Current Temperature
            </span>

            <h2>
              {Math.round(Number(current.temperature_2m ?? 0))}°C
            </h2>

            <p>{weatherDescription}</p>

            <span className="weather-location">
              Gujranwala
            </span>
          </div>

          <div className="weather-card humidity-card">
            <HumidityGauge
              humidity={Number(current.relative_humidity_2m ?? 0)}
            />
          </div>

          <div className="weather-card wind-card">
            <span className="weather-card-label">
              Wind Speed
            </span>

            <h2>
              {Number(current.wind_speed_10m ?? 0)} km/h
            </h2>

            <p>Current wind conditions</p>
          </div>

          <div className="weather-card rain-card">
            <span className="weather-card-label">
              Rain Probability
            </span>

            <h2>
              {daily?.precipitation_probability_max?.[0] ?? 0}%
            </h2>

            <p>Today's rain chance</p>
          </div>

        </section>
      )}

      {!current && !weatherLoading && !weatherError && (
        <div className="dashboard-empty">
          Weather data is not available yet. Please refresh weather.
        </div>
      )}

      {/* FIVE DAY FORECAST */}
      {daily?.time?.length > 0 && (
        <section className="dashboard-section">

          <div className="section-heading-row">
            <div>
              <span className="section-kicker">WEATHER REPORT</span>
              <h2>Next 5 Days Forecast</h2>
            </div>
          </div>

          <div className="forecast-grid">

            {daily.time.slice(0, 5).map((date, index) => (
              <div className="forecast-card" key={`${date}-${index}`}>

                <h4>
                  {new Date(`${date}T12:00:00`).toLocaleDateString(
                    "en-GB",
                    {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    }
                  )}
                </h4>

                <span className="forecast-condition">
                  {getWeatherDescription(
                    daily.weather_code?.[index] ?? 0
                  )}
                </span>

                <div className="forecast-temperatures">
                  <strong>
                    {Math.round(
                      daily.temperature_2m_max?.[index] ?? 0
                    )}°
                  </strong>

                  <span>
                    {Math.round(
                      daily.temperature_2m_min?.[index] ?? 0
                    )}°
                  </span>
                </div>

                <div className="forecast-detail">
                  Rain: {daily.precipitation_probability_max?.[index] ?? 0}%
                </div>

                <div className="forecast-detail">
                  Wind: {daily.wind_speed_10m_max?.[index] ?? 0} km/h
                </div>

              </div>
            ))}

          </div>

        </section>
      )}

      {/* CUTTING BY CROP */}
      <section className="dashboard-section">

        <div className="section-heading-row">
          <div>
            <span className="section-kicker">FIELD PLANNING</span>
            <h2>Cutting by Crop</h2>
          </div>
        </div>

        <div className="dashboard-table-wrap">

          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Field</th>
                <th>Cutting Date</th>
                <th>Expected Quantity</th>
                <th>Harvested</th>
              </tr>
            </thead>

            <tbody>
              {crops.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No crop records available.
                  </td>
                </tr>
              ) : (
                crops.map((crop) => (
                  <tr key={crop.id}>
                    <td>{crop.name}</td>
                    <td>{crop.field || "Not specified"}</td>
                    <td>{formatDate(crop.cuttingDate)}</td>
                    <td>
                      {crop.expectedQty ?? crop.expectedQuantity ?? 0} kg
                    </td>
                    <td>
                      {crop.harvestQty ?? 0} kg
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>

      </section>

      {/* PROFIT BY CROPS */}
      <section className="dashboard-section">

        <div className="section-heading-row">
          <div>
            <span className="section-kicker">FINANCIAL PERFORMANCE</span>
            <h2>Profit by Crops</h2>
          </div>
        </div>

        <div className="dashboard-table-wrap">

          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Revenue</th>
                <th>Total Cost</th>
                <th>Profit / Loss</th>
              </tr>
            </thead>

            <tbody>
              {crops.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No crop records available.
                  </td>
                </tr>
              ) : (
                crops.map((crop) => {
                  const row = Array.isArray(profitRows)
                    ? profitRows.find(
                        (item) =>
                          String(item.cropId ?? item.id) === String(crop.id)
                      )
                    : profitRows?.[crop.id];

                  const revenue = Number(row?.revenue ?? 0);
                  const cost = Number(row?.totalCost ?? row?.cost ?? 0);
                  const profit = getCropProfit(crop.id);

                  return (
                    <tr key={crop.id}>
                      <td>{crop.name}</td>
                      <td>Rs. {revenue.toLocaleString("en-PK")}</td>
                      <td>Rs. {cost.toLocaleString("en-PK")}</td>
                      <td className={profit >= 0 ? "profit-positive" : "profit-negative"}>
                        Rs. {profit.toLocaleString("en-PK")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

        </div>

      </section>

      {/* CROP HEALTH OVERVIEW */}
      <section className="dashboard-section">

        <div className="section-heading-row">
          <div>
            <span className="section-kicker">FIELD CONDITION</span>
            <h2>Crop Health Overview</h2>
          </div>
        </div>

        <div className="dashboard-two-column">
          <div className="dashboard-panel">
            <h3>Crop Health List</h3>
            <CropHealthList />
          </div>

          <div className="dashboard-panel">
            <h3>Crop Health Distribution</h3>
            <CropHealthChart />
          </div>
        </div>

      </section>

      {/* HARVEST AND ORDERS SUMMARY */}
      <section className="dashboard-section">

        <div className="section-heading-row">
          <div>
            <span className="section-kicker">BUSINESS OVERVIEW</span>
            <h2>Harvest and Orders Summary</h2>
          </div>
        </div>

        <div className="dashboard-two-column">
          <div className="dashboard-panel">
            <h3>Harvest Summary</h3>
            <HarvestSummary />
          </div>

          <div className="dashboard-panel">
            <h3>Orders Summary</h3>
            <OrdersSummary />
          </div>
        </div>

      </section>


             <AttendanceChart/>
             <WorkerforceCard/>
             <EquipmentStats/>
             <ServiceDuePanel/>
      {/* TOTAL FARM STATISTICS */}
      <section className="dashboard-section">

        <div className="section-heading-row">
          <div>
            <span className="section-kicker">FARM PERFORMANCE</span>
            <h2>Farm Statistics</h2>
          </div>
        </div>

        <div className="dashboard-stats-grid">

          <StatCard
            title="Total Crops"
            value={crops.length}
            icon="🌱"
          />

          <StatCard
            title="Total Buyers"
            value={buyers.length}
            icon="👥"
          />

          <StatCard
            title="Total Orders"
            value={orders.length}
            icon="📦"
          />

          <StatCard
            title="Total Harvest"
            value={`${totalHarvested} kg`}
            icon="🌾"
          />

        </div>

        <div className="dashboard-panel mt-4">

          <h3>Farm Statistics Table</h3>

          <div className="dashboard-table-wrap">
            <table className="table dashboard-table">

              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Total Crops</td>
                  <td>{crops.length}</td>
                </tr>

                <tr>
                  <td>Total Buyers</td>
                  <td>{buyers.length}</td>
                </tr>

                <tr>
                  <td>Total Orders</td>
                  <td>{orders.length}</td>
                </tr>

                <tr>
                  <td>Total Harvested</td>
                  <td>{totalHarvested} kg</td>
                </tr>

                <tr>
                  <td>Total Sold</td>
                  <td>{totalSold} kg</td>
                </tr>

                <tr>
                  <td>Remaining Stock</td>
                  <td>{totalRemaining} kg</td>
                </tr>
              </tbody>

            </table>
          </div>

        </div>

      </section>

      {/* HARVEST AND SALES OVERVIEW */}
      <section className="dashboard-section">

        <div className="section-heading-row">
          <div>
            <span className="section-kicker">HARVEST ANALYTICS</span>
            <h2>Harvest and Sales Overview</h2>
          </div>
        </div>

        <div className="dashboard-panel">
          <HarvestChart />
        </div>

      </section>
      {/* LOW STOCK */}
      <section className="dashboard-section">

        <div className="section-heading-row">
          <div>
            <span className="section-kicker">INVENTORY MONITORING</span>
            <h2>Low Stock Crops</h2>
          </div>
        </div>

        <div className="dashboard-panel">

          {lowStockCrops.length === 0 ? (
            <p className="dashboard-muted">
              All crops have sufficient stock.
            </p>
          ) : (
            <ul className="due-crop-list">
              {lowStockCrops.map((crop) => (
                <li key={crop.id}>
                  <strong>{crop.name || "Unnamed Crop"}</strong>
                  <span>
                    Stock: {crop.quantity ?? crop.stock ?? 0}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </div>
       </section> 
          {/* FARM ALERTS */}
      <section className="dashboard-section">

        <div className="section-heading-row">
          <div>
            <span className="section-kicker">IMPORTANT NOTIFICATIONS</span>
            <h2>Farm Alerts</h2>
          </div>
        </div>

        <div className="dashboard-panel">
          <AlertsPanel
            humidity={current?.relative_humidity_2m}
          />

          {weatherAlerts.map((message) => (
            <div
              className="alert alert-warning"
              key={message}
            >
              {message}
            </div>
          ))}
        </div>

      </section>
      {/* DATA SOURCE */}
      <p className="dashboard-footer">
        Live weather data provided by Open-Meteo.
      </p>

    </div>
  );
}  

      