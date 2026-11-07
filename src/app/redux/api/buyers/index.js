import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all buyers
export function getBuyers() {
  return Promise.resolve(ok(readList(KEYS.buyers)));
}
// Create new buyer
export function createBuyer(buyer) {
  const list = readList(KEYS.buyers);
  const newBuyer = {
    ...buyer,
    id: uid(),
  };
  const saved = writeList(KEYS.buyers, [...list, newBuyer]);
  return saved
    ? Promise.resolve(ok(newBuyer, "Buyer added"))
    : Promise.resolve(bad("Storage full"));
}
// Update buyer
export function updateBuyer(buyer) {
  const list = readList(KEYS.buyers).map((item) =>
    item.id === buyer.id ? { ...item, ...buyer } : item
  );
  const saved = writeList(KEYS.buyers, list);
  return saved
    ? Promise.resolve(ok(buyer, "Buyer updated"))
    : Promise.resolve(bad("Buyer update failed"));
}
// Remove buyer
export function removeBuyer(id) {
  const list = readList(KEYS.buyers).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.buyers, list);
  return saved
    ? Promise.resolve(ok({ id }, "Buyer removed"))
    : Promise.resolve(bad("Buyer removal failed"));
}