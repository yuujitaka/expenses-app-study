import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpenseContext } from "../../context/Expense";
import { getDateMinusDays } from "../../utils/date";
import { fetchExpenses } from "../../services/ExpenseAPI";

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    return expense.date >= getDateMinusDays(today, 7);
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchExpenses();
      setExpenses(response);
    };

    fetchData();
  }, []);

  return <ExpensesOutput expenses={recentExpenses} period="Last 7 days" />;
};

export default RecentExpenses;
