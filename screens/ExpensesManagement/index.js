import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect } from "react";

import { ExpenseContext } from "../../context/Expense";
import IconButton from "../../components/IconButton";
import { theme } from "../../constants/theme";
import ExpenseForm from "./ExpenseForm";

const ExpensesManagement = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { expenses, deleteExpense, addExpense, updateExpense } =
    useContext(ExpenseContext);
  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteHandler = () => {
    deleteExpense(expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        selectedExpense={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={theme.colors.error[100]}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ExpensesManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: theme.colors.primary[10],
    alignItems: "center",
  },
});
