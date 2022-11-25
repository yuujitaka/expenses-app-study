import api from "../api";

export const storeExpense = async (expenseData) => {
  const response = await api.post("/expenses.json", expenseData);
  return response;
};

export const fetchExpenses = async () => {
  const response = await api.get("/expenses.json");

  const expensesList = Object.keys(response.data).map((expense) => ({
    ...response.data[expense],
    id: expense,
    date: new Date(response.data[expense].date),
  }));

  return expensesList;
};
