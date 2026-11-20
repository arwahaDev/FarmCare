import { NavLink } from "react-router-dom";


const menuItems = [
  { title: "Dashboard", path: "/", icon: "▦" },
  { title: "Crops", path: "/crops", icon: "🌱" },
  { title: "Harvest & Orders", path: "/harvest-orders", icon: "📦" },
  { title: "Buyers", path: "/buyers", icon: "👥" },
  { title: "Workers", path: "/workers", icon: "👨‍🌾" },
  { title: "Tasks", path: "/tasks", icon: "📋" },
  {title: "Equipment", path: "/equipment", icon: "🚜"},
  { title: "Maintenance", path: "/maintenance", icon: "🔧" },
  { title: "Expenses", path: "/expenses", icon: "💰" },
  { title: "Inventory", path: "/Inventory", icon: "📦" },
  { title: "Reports", path: "/reports", icon: "📊" },
  { title: "User Management", path: "/users", icon: "👤", adminOnly: true },
];

export default function Sidebar() {
   const session = JSON.parse(
  localStorage.getItem("agri_session") || "null"
);
    const userRole = (
     session?.user?.userType ||
     session?.userType ||
     session?.role ||
      ""
     ).toLowerCase();

    const isAdmin = userRole === "admin";
    const isTeamlead = userRole === "teamlead";
    const isEmployee = userRole === "employee";
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🌿</span>
        <div>
          <h2>Farmer Hub</h2>
          <p>Farm Management</p>
        </div>
      </div>
          <p className="menu-heading">MAIN MENU</p>
                <nav className="sidebar-nav">
  {menuItems
    .filter((item) => {
      if (isAdmin) return true;

      if (isTeamlead) {
        return [
          "Dashboard",
          "Crops",
          "Harvest & Orders",
          "Buyers",
          "Workers",
          "Tasks",
          "Equipment",
          "Maintenance",
          "Expenses",
          "Inventory",
          "Reports",
          "Attendance"
        ].includes(item.title);
      }

      if (isEmployee) {
        return [
          "Dashboard",
          "Tasks",
          "Attendance"
        ].includes(item.title);
      }

      return false;
    })
    .map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === "/"}
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <span className="menu-icon">{item.icon}</span>
        <span>{item.title}</span>
      </NavLink>
    ))}
</nav>
      <div className="sidebar-footer">
        <span>🌾</span>
        <div>
          <strong>Agriculture System</strong>
          <p>Grow better, together.</p>
        </div>
      </div>
    </aside>
  );
}