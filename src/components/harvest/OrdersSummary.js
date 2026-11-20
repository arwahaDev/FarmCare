import { useEffect, useState } from "react";

export default function HarvestSummary() {
  const [crops, setCrops] = useState([]);
  const [buyers, setBuyers] = useState([]);

  function loadData() {
    try {
      const savedCrops = JSON.parse(
        localStorage.getItem("agri_crops") || "[]"
      );
      const savedBuyers = JSON.parse(
        localStorage.getItem("agri_buyers") || "[]"
      );

      setCrops(Array.isArray(savedCrops) ? savedCrops : []);
      setBuyers(Array.isArray(savedBuyers) ? savedBuyers : []);
    } catch {
      setCrops([]);
      setBuyers([]);
    }
  }

  useEffect(() => {
    loadData();
    window.addEventListener("focus", loadData);

    return () => window.removeEventListener("focus", loadData);
  }, []);

  const totalHarvested = crops.reduce(
    (total, crop) =>
      total + (Number(crop.harvestQty ?? crop.expectedQuantity) || 0),
    0
  );

  const totalSold = buyers.reduce(
    (total, buyer) => total + (Number(buyer.quantity) || 0),
    0
  );

  const remainingStock = Math.max(0, totalHarvested - totalSold);

  const stats = [
    {
      title: "Total Harvested",
      value: totalHarvested,
      unit: "kg",
      icon: "🌾",
      color: "#287A52",
      bg: "#EAF5EE",
      description: "Total crop production",
    },
    {
      title: "Total Sold",
      value: totalSold,
      unit: "kg",
      icon: "🛒",
      color: "#3269A8",
      bg: "#EDF3FB",
      description: "Quantity sold to buyers",
    },
    {
      title: "Remaining Stock",
      value: remainingStock,
      unit: "kg",
      icon: "📦",
      color: "#B47A24",
      bg: "#FFF5E5",
      description: "Available crop quantity",
    },
  ];

  const percentage =
    totalHarvested > 0
      ? Math.min(100, (totalSold / totalHarvested) * 100)
      : 0;

  return (
    <section className="mb-4">

      {/* Section Heading */}
      <div className="mb-3">
        <small
          className="fw-bold"
          style={{
            color: "#287A52",
            letterSpacing: "2px",
            fontSize: "11px",
          }}
        >
          FARM PRODUCTION
        </small>

        <h4
          className="fw-bold mt-1 mb-1"
          style={{ color: "#263746" }}
        >
          Harvest Overview
        </h4>

        <p className="text-muted small mb-0">
          Track harvested crops, sales and available stock
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3">
        {stats.map((stat) => (
          <div className="col-12 col-sm-6 col-xl-4" key={stat.title}>
            <div
              className="h-100 p-3 p-lg-4"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E9EEF0",
                borderRadius: "16px",
                boxShadow: "0 3px 14px rgba(30,50,40,0.06)",
                borderTop: `4px solid ${stat.color}`,
                transition: "transform 0.2s ease",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span
                  className="small fw-semibold"
                  style={{ color: "#687783" }}
                >
                  {stat.title}
                </span>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: stat.bg,
                    borderRadius: "13px",
                    fontSize: "22px",
                  }}
                >
                  {stat.icon}
                </div>
              </div>

              <h3
                className="fw-bold mb-2"
                style={{
                  color: stat.color,
                  fontSize: "28px",
                }}
              >
                {stat.value.toLocaleString()}{" "}
                <span style={{ fontSize: "15px" }}>
                  {stat.unit}
                </span>
              </h3>

              <small className="text-muted">
                {stat.description}
              </small>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Progress */}
      <div
        className="mt-3 p-3 p-lg-4"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E9EEF0",
          borderRadius: "16px",
          boxShadow: "0 3px 14px rgba(30,50,40,0.05)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold" style={{ color: "#34495E" }}>
            Harvest Sales Progress
          </span>

          <span
            className="fw-bold"
            style={{ color: "#287A52" }}
          >
            {percentage.toFixed(0)}%
          </span>
        </div>

        <div
          className="progress"
          style={{
            height: "10px",
            borderRadius: "20px",
            background: "#EAF0EC",
          }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${percentage}%`,
              background: "#287A52",
              borderRadius: "20px",
            }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        <div className="d-flex justify-content-between mt-2">
          <small className="text-muted">
            Sold: {totalSold.toLocaleString()} kg
          </small>

          <small className="text-muted">
            Harvested: {totalHarvested.toLocaleString()} kg
          </small>
        </div>
      </div>

    </section>
  );
}