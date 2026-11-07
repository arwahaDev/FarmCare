import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all orders
export function getOrders() {
  return Promise.resolve(ok(readList(KEYS.orders)));
}
// Create new order
export function createOrder(order) {
  const list = readList(KEYS.orders);
  const newOrder = {
    ...order,
    id: uid(),
  };
  const saved = writeList(KEYS.orders, [...list, newOrder]);
  return saved
    ? Promise.resolve(ok(newOrder, "Order added"))
    : Promise.resolve(bad("Storage full"));
}
// Update existing order
export function updateOrder(order) {
  const list = readList(KEYS.orders).map((item) =>
    item.id === order.id ? { ...item, ...order } : item
  );
  const saved = writeList(KEYS.orders, list);
  return saved
    ? Promise.resolve(ok(order, "Order updated"))
    : Promise.resolve(bad("Order update failed"));
}
// Delete order
export function removeOrder(id) {
  const list = readList(KEYS.orders).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.orders, list);
  return saved
    ? Promise.resolve(ok({ id }, "Order removed"))
    : Promise.resolve(bad("Order removal failed"));
}