import { useContext } from "react";

import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpenseContext } from "../../context/Expense";

const ExpensesOverview = () => {
  const { expenses } = useContext(ExpenseContext);
  return <ExpensesOutput expenses={expenses} period="Total" />;
};

export default ExpensesOverview;
