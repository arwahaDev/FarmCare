import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import { persistMiddleware } from "../middleware/persistMiddleware";
import { activityLogger } from "../middleware/activityLogger";
import { KEYS, readList } from "../api";

// 1. REHYDRATE REDUX STATE FROM LOCAL STORAGE
const loadState = () => {
  try {
    return {
      crops: {
        crops: readList(KEYS.crops),
      },
      orders: {
        orders: readList(KEYS.orders),
      },
      buyers: {
        buyers: readList(KEYS.buyers),
      },
      tasks: {
        tasks: readList(KEYS.tasks),
      },
      expenses: {
        expenses: readList(KEYS.expenses),
      },
      inventory: {
        ...undefined,
        inventory:readList(KEYS.inventory),
      },
      workers: {
        workers: readList(KEYS.workers),
      },
      attendance: {
        records: readList(KEYS.attendance),
      },
      equipment: {
        equipment: readList(KEYS.equipment),
      },
      maintenance: {
        services: readList(KEYS.maintenance),
      },
      activity: {
        logs: readList(KEYS.activity),
      },
    };
  } catch (error) {
    console.error("Rehydration Error:", error);
    return undefined;
  }
};

// 2. REDUX STORE CONFIGURATION
export const store = configureStore({
  reducer: rootReducer,

  // 3. REHYDRATE INITIAL STATE
  preloadedState: loadState(),

  // 4. REDUX THUNK + CUSTOM MIDDLEWARE
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      persistMiddleware,
      activityLogger
    ),

  // 5. REDUX DEVTOOLS
  devTools: process.env.NODE_ENV !== "production",
});

export default store;