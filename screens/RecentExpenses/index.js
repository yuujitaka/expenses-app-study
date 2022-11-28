import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../../components/ExpensesOutput";
import { ExpenseContext } from "../../context/Expense";
import { getDateMinusDays } from "../../utils/date";
import { fetchExpenses } from "../../services/ExpenseAPI";
import Loading from "../../components/Loading";
import ErrorOverlay from "../../components/ErrorOverlay";

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    return expense.date >= getDateMinusDays(today, 7);
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      try {
        const response = await fetchExpenses();
        setExpenses(response);

      } catch (error){
        setError('Could not fetch expenses!');
      }
      
      setIsFetching(false);
    };

    fetchData();
  }, []);

  const errorHandler = () => {
    setError(null);
  }

  if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <ExpensesOutput expenses={recentExpenses} period="Last 7 days" />
      )}
    </>
  );
};

export default RecentExpenses;
