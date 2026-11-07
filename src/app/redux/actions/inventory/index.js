export const GETINVENTORY = "GETINVENTORY";
export const ADDINVENTORY = "ADDINVENTORY";
export const UPDATEINVENTORY = "UPDATEINVENTORY";
export const REMOVEINVENTORY = "REMOVEINVENTORY";

// Get Inventory
export const getInventory = (items) => ({
  type: GETINVENTORY,
  payload: items,
});

// Add Inventory Item
export const addInventoryItem = (item) => ({
  type: ADDINVENTORY,
  payload: item,
});

// Update Inventory Item
export const updateInventoryItem = (item) => ({
  type: UPDATEINVENTORY,
  payload: item,
});

// Remove Inventory Item
export const removeInventoryItem = (id) => ({
  type: REMOVEINVENTORY,
  payload: id,
});