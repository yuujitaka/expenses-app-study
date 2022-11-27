import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpenseContext } from "../../context/Expense";
import { getDateMinusDays } from "../../utils/date";
import { fetchExpenses } from "../../services/ExpenseAPI";
import Loading from "../../components/Loading";

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [isFetching, setIsFetching] = useState(true);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    return expense.date >= getDateMinusDays(today, 7);
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const response = await fetchExpenses();
      setIsFetching(false);
      setExpenses(response);
    };

    fetchData();
  }, []);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <ExpensesOutput expenses={recentExpenses} period="Last 7 days" />
      )}
      ;
    </>
  );
};

export default RecentExpenses;
