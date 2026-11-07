import { combineReducers } from "redux";
import userReducer from "./user";
import cropsReducer from "./crops";
import ordersReducer from "./orders";
import buyersReducer from "./buyers";
import weatherReducer from "./weather";
import tasksReducer from "./tasks";
import expensesReducer from "./expenses";
import inventoryReducer from "./inventory";
import workersReducer from "./workers";
import attendanceReducer from "./attendance";
import equipmentReducer from "./equipment";
// import weatherReducer from "./weather";
import maintenanceReducer from "./maintenance";
import alertsReducer from "./alerts";
import activityReducer from "./activity";
import uiReducer from "./ui";
const rootReducer = combineReducers({
  user: userReducer,
  crops: cropsReducer,
  orders: ordersReducer,
  buyers: buyersReducer,
  weather: weatherReducer,
  tasks: tasksReducer,
  expenses: expensesReducer,
  inventory: inventoryReducer,
  workers: workersReducer,
  attendance: attendanceReducer,
  equipment: equipmentReducer,
  maintenance: maintenanceReducer,
  alerts: alertsReducer,
  activity: activityReducer,
  ui: uiReducer,
});
export default rootReducer;