import { useState } from "react";
import { useSelector } from "react-redux";

function ReportBuilder() {

  // Get Redux Data
  const cropsData = useSelector((state) => state.crops);
  const buyersData = useSelector((state) => state.buyers);
  const ordersData = useSelector((state) => state.orders);
  const tasksData = useSelector((state) => state.tasks);

  // Ensure Data is Always Arrays
  const crops = Array.isArray(cropsData)
    ? cropsData
    : Array.isArray(cropsData?.crops)
      ? cropsData.crops
      : [];

  const buyers = Array.isArray(buyersData)
    ? buyersData
    : Array.isArray(buyersData?.buyers)
      ? buyersData.buyers
      : [];

  const orders = Array.isArray(ordersData)
    ? ordersData
    : Array.isArray(ordersData?.orders)
      ? ordersData.orders
      : [];

  const tasks = Array.isArray(tasksData)
    ? tasksData
    : Array.isArray(tasksData?.tasks)
      ? tasksData.tasks
      : [];

  const [report, setReport] = useState(null);

  // Generate Report
  const generateReport = () => {

    const completedTasks = tasks.filter(
      (task) => Boolean(task.completed)
    ).length;

    const pendingTasks = tasks.filter(
      (task) => !task.completed
    ).length;

    setReport({
      generatedAt: new Date().toLocaleString(),

      totalCrops: crops.length,
      totalBuyers: buyers.length,
      totalOrders: orders.length,
      totalTasks: tasks.length,

      completedTasks,
      pendingTasks,
    });
  };

  return (
    <section className="report-builder">

      <h3>Report Builder</h3>

      <p>
        Generate a summary of your current farm management data.
      </p>

      <button
        type="button"
        onClick={generateReport}
      >
        Generate Report
      </button>

      {report && (
        <div className="report-result">

          <h4>Farm Management Report</h4>

          <p>
            Generated: {report.generatedAt}
          </p>

          <ul>
            <li>
              Total Crops: {report.totalCrops}
            </li>

            <li>
              Total Buyers: {report.totalBuyers}
            </li>

            <li>
              Total Orders: {report.totalOrders}
            </li>

            <li>
              Total Tasks: {report.totalTasks}
            </li>

            <li>
              Completed Tasks: {report.completedTasks}
            </li>

            <li>
              Pending Tasks: {report.pendingTasks}
            </li>
          </ul>

          <button
            type="button"
            onClick={() => window.print()}
          >
            Print Report
          </button>

        </div>
      )}

    </section>
  );
}

export default ReportBuilder;