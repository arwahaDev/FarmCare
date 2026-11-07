export const GETEXPENSES = "GETEXPENSES";
export const ADDEXPENSE = "ADDEXPENSE";
export const UPDATEEXPENSE = "UPDATEEXPENSE";
export const REMOVEEXPENSE = "REMOVEEXPENSE";

// Get Expenses
export const getExpenses = (expenses) => ({
  type: GETEXPENSES,
  payload: expenses,
});

// Add Expense
export const addExpense = (expense) => ({
  type: ADDEXPENSE,
  payload: expense,
});

// Update Expense
export const updateExpense = (expense) => ({
  type: UPDATEEXPENSE,
  payload: expense,
});

// Remove Expense
export const removeExpense = (id) => ({
  type: REMOVEEXPENSE,
  payload: id,
});