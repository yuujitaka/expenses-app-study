import { useContext } from "react";

import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpenseContext } from "../../context/Expense";
import { getDateMinusDays } from "../../utils/date";

const RecentExpenses = () => {
  const { expenses } = useContext(ExpenseContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    return expense.date >= getDateMinusDays(today, 7);
  });

  return <ExpensesOutput expenses={recentExpenses} period="Last 7 days" />;
};

export default RecentExpenses;
