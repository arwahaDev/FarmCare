import Dashboard from "../pages/Dashboard";
import Crops from "../pages/Crops";
import HarvestOrders from "../pages/HarvestOrders";
import Buyers from "../pages/Buyers";
import Workers from "../pages/Workers";
import Equipment from "../pages/Equipment";
import Maintenance from "../pages/Maintenance";
import Tasks from "../pages/Tasks";
import Expenses from "../pages/Expenses";
import Reports from "../pages/Reports";
import Inventory from "../pages/Inventory";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const allRoles = ["Admin", "Manager"];

const routes = [
  {
    path: "/login",
    element: Login,
    public: true,
  },
  {
    path: "/",
    element: Dashboard,
    allowedRoles: allRoles,
  },
  {
    path: "/crops",
    element: Crops,
    allowedRoles: allRoles,
  },
  {
    path: "/harvest-orders",
    element: HarvestOrders,
    allowedRoles: allRoles,
  },
  {
    path: "/buyers",
    element: Buyers,
    allowedRoles: allRoles,
  },
  {
    path: "/workers",
    element: Workers,
    allowedRoles: allRoles,
  },
  {
    path: "/equipment",
    element: Equipment,
    allowedRoles: allRoles,
  },
  {
    path: "/maintenance",
    element: Maintenance,
    allowedRoles: allRoles,
  },
  {
    path: "/tasks",
    element: Tasks,
    allowedRoles: allRoles,
  },
  {
    path: "/expenses",
    element: Expenses,
    allowedRoles: allRoles,
  },
  {
    path: "/reports",
    element: Reports,
    allowedRoles: allRoles,
  },
  {
    path: "/inventory",
    element: Inventory,
    allowedRoles: allRoles,
  },
  {
    path: "*",
    element: NotFound,
    public: true,
  },
];

export default routes;