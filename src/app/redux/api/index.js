// Local Storage Keys
export const KEYS = {
  crops: "agri_crops",
  orders: "agri_orders",
  buyers: "agri_buyers",
  tasks: "agri_tasks",
  expenses: "agri_expenses",
  inventory: "agri_inventory",
  workers: "agri_workers",
  attendance: "agri_attendance",
  equipment: "agri_equipment",
  maintenance: "agri_maintenance",
  activity: "agri_activity",
  session: "agri_session",
};
// Success Response
// Success Response
export const ok = (data, message = "OK") => ({
  success: true,
  message,
  data,
});

// Error Response
export const bad = (message) => ({
  success: false,
  message,
  data: null,
});
// Read Data from LocalStorage
export const readList = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading data:", error);
    return [];
  }
};
// Save Data to LocalStorage
export const writeList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
};
// Generate Unique ID
export const uid = () => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};
// Promise-Based Storage API
export const storageApi = {
  getItem: (key) => {
    try {
      const data = localStorage.getItem(key);
      return Promise.resolve(data ? JSON.parse(data) : null);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};