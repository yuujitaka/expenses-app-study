import { Text, View } from "react-native";
import List from "./List";

const ExpensesOutput = ({ expenses, period }) => {
  const expensesSum =
    expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

  return (
    <View>
      <View>
        <Text>{period}</Text>
        <Text>${expensesSum.toFixed(2)}</Text>
      </View>
      {expenses.length ? (
        <List expenses={expenses} />
      ) : (
        <Text>No Expenses found</Text>
      )}
    </View>
  );
};
export default ExpensesOutput;
