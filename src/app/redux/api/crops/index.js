import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all crops
export function getCrops() {
  return Promise.resolve(ok(readList(KEYS.crops)));
}
// Add new crop
export function createCrop(crop) {
  const list = readList(KEYS.crops);
  const item = {
    ...crop,
    id: uid(),
  };
  const saved = writeList(KEYS.crops, [...list, item]);
  return saved
    ? Promise.resolve(ok(item, "Crop added"))
    : Promise.resolve(bad("Storage full"));
}
// Update crop
export function updateCrop(crop) {
  const list = readList(KEYS.crops).map((item) =>
    item.id === crop.id ? { ...item, ...crop } : item
  );
  const saved = writeList(KEYS.crops, list);
  return saved
    ? Promise.resolve(ok(crop, "Crop updated"))
    : Promise.resolve(bad("Crop update failed"));
}
// Remove crop
export function removeCrop(id) {
  const list = readList(KEYS.crops).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.crops, list);
  return saved
    ? Promise.resolve(ok({ id }, "Crop removed"))
    : Promise.resolve(bad("Crop removal failed"));
}