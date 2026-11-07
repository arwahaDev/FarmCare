import { EXPENSE_REQUEST as T } from "../../actions/utilities";
import { ADDEXPENSE, UPDATEEXPENSE, REMOVEEXPENSE, GETEXPENSES } from "../../actions/expenses";

const initialState = {
  expensesLoading: false,
  expensesSuccess: false,
  expensesFailure: false,
  expensesError: null,
  expenses: [],
  addLoading: false,
  addSuccess: false,
  addFailure: false,
  addError: null,
  updateLoading: false,
  updateSuccess: false,
  updateFailure: false,
  updateError: null,
  removeLoading: false,
  removeSuccess: false,
  removeFailure: false,
  removeError: null,
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Existing async action pattern
    case T.GET_EXPENSES_REQUEST:
      return { ...state, expensesLoading: true, expensesSuccess: false, expensesFailure: false, expensesError: null };

    case T.GET_EXPENSES_SUCCESS:
      return { ...state, expensesLoading: false, expensesSuccess: true, expenses: action.payload };

    case T.GET_EXPENSES_FAILURE:
      return { ...state, expensesLoading: false, expensesFailure: true, expensesError: action.payload };

    case T.ADD_EXPENSE_REQUEST:
      return { ...state, addLoading: true, addSuccess: false, addFailure: false, addError: null };

    case T.ADD_EXPENSE_SUCCESS:
      return { ...state, addLoading: false, addSuccess: true, expenses: [...state.expenses, action.payload] };

    case T.ADD_EXPENSE_FAILURE:
      return { ...state, addLoading: false, addFailure: true, addError: action.payload };

    // Current ExpenseForm plain actions
    case GETEXPENSES:
      return { ...state, expenses: action.payload };

    case ADDEXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };

    case UPDATEEXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };

    case REMOVEEXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };

    default:
      return state;
  }
};

export default expensesReducer;