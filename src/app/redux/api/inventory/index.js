import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all inventory items
export function getInventory() {
  return Promise.resolve(ok(readList(KEYS.inventory)));
}
// Create new inventory item
export function createInventoryItem(item) {
  const list = readList(KEYS.inventory);
  const newItem = {
    ...item,
    id: uid(),
  };
  const saved = writeList(KEYS.inventory, [
    ...list,
    newItem,
  ]);
  return saved
    ? Promise.resolve(ok(newItem, "Inventory item added"))
    : Promise.resolve(bad("Storage full"));
}
// Update inventory item
export function updateInventoryItem(item) {
  const list = readList(KEYS.inventory).map((existingItem) =>
    existingItem.id === item.id
      ? { ...existingItem, ...item }
      : existingItem
  );
  const saved = writeList(KEYS.inventory, list);
  return saved
    ? Promise.resolve(ok(item, "Inventory item updated"))
    : Promise.resolve(bad("Inventory update failed"));
}
// Remove inventory item
export function removeInventoryItem(id) {
  const list = readList(KEYS.inventory).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.inventory, list);
  return saved
    ? Promise.resolve(ok({ id }, "Inventory item removed"))
    : Promise.resolve(bad("Inventory removal failed"));
}