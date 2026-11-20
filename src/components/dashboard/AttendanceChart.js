import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AttendanceChart() {
  const records = useSelector(
    (state) => state.attendance?.records ?? []
  );
console.log("Attendance Records: ",records);
  // Generate last 7 days
  const lastSevenDays = Array.from(
    { length: 14 },
    (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (13 - index));

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return {
        date: `${year}-${month}-${day}`,
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        }),
      };
    }
  );

  const statuses = ["Present", "Absent", "Half-day", "Leave"];

  const getCount = (date, status) =>
    records.filter(
      (record) =>
        record.date === date &&
        record.status === status
    ).length;

  const chartData = {
    labels: lastSevenDays.map((day) => day.label),

    datasets: [
      {
        label: "Present",
        data: lastSevenDays.map((day) =>
          getCount(day.date, "Present")
        ),
        backgroundColor: "#198754",
      },
      {
        label: "Absent",
        data: lastSevenDays.map((day) =>
          getCount(day.date, "Absent")
        ),
        backgroundColor: "#dc3545",
      },
      {
        label: "Half-day",
        data: lastSevenDays.map((day) =>
          getCount(day.date, "Half-day")
        ),
        backgroundColor: "#ffc107",
      },
      {
        label: "Leave",
        data: lastSevenDays.map((day) =>
          getCount(day.date, "Leave")
        ),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Worker Attendance",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const totalRecords = records.length;

  const present = records.filter(
    (item) => item.status === "Present"
  ).length;

  const absent = records.filter(
    (item) => item.status === "Absent"
  ).length;

  const halfDay = records.filter(
    (item) => item.status === "Half-day"
  ).length;

  const leave = records.filter(
    (item) => item.status === "Leave"
  ).length;

  const attendancePercentage =
    totalRecords > 0
      ? Math.round((present / totalRecords) * 100)
      : 0;

  return (
    <section className="dashboard-section">
      <div className="section-heading-row">
        <div>
          <span className="section-kicker">
            WORKFORCE MONITORING
          </span>
          <h2>Worker Attendance Overview</h2>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        <div className="dashboard-panel">
          <h5>Present</h5>
          <h3 className="text-success">{present}</h3>
        </div>

        <div className="dashboard-panel">
          <h5>Absent</h5>
          <h3 className="text-danger">{absent}</h3>
        </div>

        <div className="dashboard-panel">
          <h5>Half-day</h5>
          <h3 className="text-warning">{halfDay}</h3>
        </div>

        <div className="dashboard-panel">
          <h5>Leave</h5>
          <h3 className="text-primary">{leave}</h3>
        </div>
      </div>

      <div className="dashboard-panel mt-4">
        <h5>Attendance Percentage</h5>
        <h3>{attendancePercentage}%</h3>

        <div className="progress mb-3">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${attendancePercentage}%` }}
            aria-valuenow={attendancePercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        <small className="text-muted">
          Based on {totalRecords} attendance records.
        </small>
      </div>

      <div
        className="dashboard-panel mt-4"
        style={{ height: "380px" }}
      >
        {records.length === 0 ? (
          <p className="text-muted">
            No attendance records available. Mark worker attendance to see the chart.
          </p>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </section>
  );
}

export default AttendanceChart;