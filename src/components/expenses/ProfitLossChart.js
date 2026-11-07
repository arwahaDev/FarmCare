import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ProfitLossChart() {

  // Get Expenses from Redux
  const expensesData = useSelector(
    (state) => state.expenses
  );

  // Get Orders from Redux
  const ordersData = useSelector(
    (state) => state.orders
  );

  // Make sure Expenses is always an Array
  const expenses = Array.isArray(expensesData)
    ? expensesData
    : Array.isArray(expensesData?.expenses)
      ? expensesData.expenses
      : [];

  // Make sure Orders is always an Array
  const orders = Array.isArray(ordersData)
    ? ordersData
    : Array.isArray(ordersData?.orders)
      ? ordersData.orders
      : [];

  // Calculate Total Expenses
  const totalExpenses = expenses.reduce(
    (total, expense) => {
      const amount = Number(expense.amount || 0);

      return total + (
        Number.isFinite(amount) ? amount : 0
      );
    },
    0
  );

  // Calculate Total Income
  const totalIncome = orders.reduce(
    (total, order) => {
      const amount = Number(
        order.totalAmount ?? order.amount ?? 0
      );

      return total + (
        Number.isFinite(amount) ? amount : 0
      );
    },
    0
  );

  // Calculate Profit or Loss
  const profitLoss = totalIncome - totalExpenses;

  // Chart Data
  const chartData = {
    labels: [
      "Income",
      "Expenses",
      "Profit / Loss",
    ],

    datasets: [
      {
        label: "Amount (PKR)",

        data: [
          totalIncome,
          totalExpenses,
          profitLoss,
        ],

        backgroundColor: [
          "#28a745",
          "#dc3545",
          profitLoss >= 0 ? "#007bff" : "#ffc107",
        ],

        borderRadius: 6,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: "top",
      },

      tooltip: {
        callbacks: {
          label: (context) =>
            `PKR ${Number(context.raw).toLocaleString()}`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: (value) =>
            `PKR ${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <section className="profit-loss-section">

      <h3>Profit & Loss Overview</h3>

      {/* Financial Summary */}
      <div className="profit-loss-summary">

        <p>
          Total Income:{" "}
          <strong>
            PKR {totalIncome.toLocaleString()}
          </strong>
        </p>

        <p>
          Total Expenses:{" "}
          <strong>
            PKR {totalExpenses.toLocaleString()}
          </strong>
        </p>

        <p>
          {profitLoss >= 0 ? "Profit" : "Loss"}:{" "}
          <strong>
            PKR {Math.abs(profitLoss).toLocaleString()}
          </strong>
        </p>

      </div>

      {/* Profit Loss Chart */}
      <div
        className="profit-loss-chart"
        style={{
          height: "350px",
          position: "relative",
        }}
      >
        <Bar
          data={chartData}
          options={chartOptions}
        />
      </div>

      {/* Empty Income Message */}
      {totalIncome === 0 && (
        <p>
          No income recorded yet.
          Add orders to calculate income and profit/loss.
        </p>
      )}

      {/* Empty Expenses Message */}
      {totalExpenses === 0 && (
        <p>
          No expenses recorded yet.
        </p>
      )}

    </section>
  );
}

export default ProfitLossChart;