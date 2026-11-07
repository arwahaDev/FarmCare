import { useSelector } from "react-redux";

function ActivityLog() {

  // Get Redux Data
  const cropsData = useSelector((state) => state.crops);
  const buyersData = useSelector((state) => state.buyers);
  const ordersData = useSelector((state) => state.orders);
  const tasksData = useSelector((state) => state.tasks);

  // Ensure all data is Arrays
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

  // Create Activity Records
  const activities = [
    ...crops.map((item) => ({
      id: `crop-${item.id}`,
      type: "Crop",
      name: item.name || item.cropName || "Crop record",
    })),

    ...buyers.map((item) => ({
      id: `buyer-${item.id}`,
      type: "Buyer",
      name: item.name || item.buyerName || "Buyer record",
    })),

    ...orders.map((item) => ({
      id: `order-${item.id}`,
      type: "Order",
      name: item.name || item.cropName || "Order record",
    })),

    ...tasks.map((item) => ({
      id: `task-${item.id}`,
      type: "Task",
      name: item.title || "Farm task",
    })),
  ];

  return (
    <section className="activity-log">

      <h3>Activity Log</h3>

      <p>
        Overview of records currently available in your system.
      </p>

      {activities.length === 0 ? (
        <p>No activity records available yet.</p>
      ) : (
        <ul className="activity-list">

          {activities.map((activity) => (
            <li
              key={activity.id}
              className="activity-item"
            >
              <div>
                <strong>{activity.type}</strong>
                <p>{activity.name}</p>
              </div>

              <span className="activity-status">
                Available
              </span>
            </li>
          ))}

        </ul>
      )}

    </section>
  );
}

export default ActivityLog;