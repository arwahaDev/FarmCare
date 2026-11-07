import {
  KEYS,
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";
// Get all expenses
export function getExpenses() {
  return Promise.resolve(ok(readList(KEYS.expenses)));
}
// Create new expense
export function createExpense(expense) {
  const list = readList(KEYS.expenses);
  const newExpense = {
    ...expense,
    id: uid(),
  };
  const saved = writeList(KEYS.expenses, [
    ...list,
    newExpense,
  ]);
  return saved
    ? Promise.resolve(ok(newExpense, "Expense added"))
    : Promise.resolve(bad("Storage full"));
}
// Update expense
export function updateExpense(expense) {
  const list = readList(KEYS.expenses).map((item) =>
    item.id === expense.id
      ? { ...item, ...expense }
      : item
  );
  const saved = writeList(KEYS.expenses, list);
  return saved
    ? Promise.resolve(ok(expense, "Expense updated"))
    : Promise.resolve(bad("Expense update failed"));
}
// Remove expense
export function removeExpense(id) {
  const list = readList(KEYS.expenses).filter(
    (item) => item.id !== id
  );
  const saved = writeList(KEYS.expenses, list);
  return saved
    ? Promise.resolve(ok({ id }, "Expense removed"))
    : Promise.resolve(bad("Expense removal failed"));
}