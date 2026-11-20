import { useEffect, useState } from "react";

export default function HarvestSummary() {
  const [summary, setSummary] = useState({
    harvested: 0,
    orders: 0,
    sold: 0,
  });

  useEffect(() => {
    function loadSummary() {
      try {
        const harvests = JSON.parse(
          localStorage.getItem("agri_harvests") || "[]"
        );

        const orders = JSON.parse(
          localStorage.getItem("agri_orders") || "[]"
        );

        const buyers = JSON.parse(
          localStorage.getItem("agri_buyers") || "[]"
        );

        const harvested = harvests.reduce(
          (total, item) =>
            total + Math.max(0, Number(item.quantity) || 0),
          0
        );

        const sold = buyers.reduce(
          (total, buyer) =>
            total + Math.max(0, Number(buyer.quantity) || 0),
          0
        );

        setSummary({
          harvested,
          orders: orders.length,
          sold,
        });
      } catch (error) {
        console.error("Unable to load harvest summary:", error);
      }
    }

    loadSummary();
    window.addEventListener("focus", loadSummary);

    return () => {
      window.removeEventListener("focus", loadSummary);
    };
  }, []);

  const remaining = summary.harvested - summary.sold;

  const cards = [
    {
      title: "Total Harvested",
      value: `${summary.harvested.toLocaleString()} kg`,
      description: "Total recorded harvest",
      icon: "🌾",
      color: "#287A52",
      background: "#EAF5EE",
    },
    {
      title: "Total Orders",
      value: summary.orders.toLocaleString(),
      description: "Orders received",
      icon: "📦",
      color: "#3269A8",
      background: "#EDF3FB",
    },
    {
      title: "Quantity Sold",
      value: `${summary.sold.toLocaleString()} kg`,
      description: "Recorded buyer sales",
      icon: "🛒",
      color: "#B47A24",
      background: "#FFF5E5",
    },
    {
      title: "Remaining Stock",
      value: `${remaining.toLocaleString()} kg`,
      description:
        remaining < 0
          ? "Check harvest and sales records"
          : "Available harvest stock",
      icon: "🏷️",
      color: remaining < 0 ? "#C0392B" : "#6655A5",
      background: remaining < 0 ? "#FCEDEC" : "#F1EFFA",
    },
  ];

  return (
    <section className="mb-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <small
            className="fw-bold"
            style={{ color: "#287A52", letterSpacing: "2px" }}
          >
            BUSINESS OVERVIEW
          </small>
          <h4 className="fw-bold mt-1 mb-0" style={{ color: "#263746" }}>
            Harvest & Orders
          </h4>
          <small className="text-muted">
            Monitor your harvest, sales and available stock
          </small>
        </div>
      </div>

      <div className="row g-3">
        {cards.map((card) => (
          <div
            className="col-12 col-sm-6 col-xl-3"
            key={card.title}
          >
            <div
              className="h-100 p-3 p-lg-4"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E9EEF0",
                borderRadius: "16px",
                boxShadow: "0 3px 14px rgba(30, 50, 40, 0.06)",
                borderTop: `4px solid ${card.color}`,
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span
                  className="small fw-semibold"
                  style={{ color: "#687783" }}
                >
                  {card.title}
                </span>

                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: card.background,
                    fontSize: "21px",
                  }}
                >
                  {card.icon}
                </span>
              </div>

              <h3
                className="fw-bold mb-2"
                style={{ color: "#263746", fontSize: "27px" }}
              >
                {card.value}
              </h3>

              <small className="text-muted">
                {card.description}
              </small>
            </div>
          </div>
        ))}
      </div>

      {remaining < 0 && (
        <div className="alert alert-warning mt-3 mb-0">
          Recorded sales exceed the recorded harvest.
          Please check your records.
        </div>
      )}
    </section>
  );
}