import { useSelector } from "react-redux";

function EquipmentStats() {
  const equipment = useSelector(
    (state) => state.equipment?.equipment ?? []
  );

  const total = equipment.length;

  const active = equipment.filter(
    (item) => item.status === "Active"
  ).length;

  const underRepair = equipment.filter(
    (item) => item.status === "Under Repair"
  ).length;

  const idle = equipment.filter(
    (item) => item.status === "Idle"
  ).length;

  const stats = [
    {
      title: "Total Equipment",
      value: total,
      icon: "🚜",
      color: "primary",
    },
    {
      title: "Active Equipment",
      value: active,
      icon: "✅",
      color: "success",
    },
    {
      title: "Under Repair",
      value: underRepair,
      icon: "🔧",
      color: "warning",
    },
    {
      title: "Idle Equipment",
      value: idle,
      icon: "⏸️",
      color: "secondary",
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {stats.map((item) => (
        <div className="col-12 col-sm-6 col-xl-3" key={item.title}>
          <div className="card shadow-sm border-0 h-100 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-2">{item.title}</p>
                <h3 className={`text-${item.color} fw-bold mb-0`}>
                  {item.value}
                </h3>
              </div>

              <span style={{ fontSize: "30px" }}>
                {item.icon}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EquipmentStats;