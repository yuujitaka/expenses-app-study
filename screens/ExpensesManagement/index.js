import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";

import { ExpenseContext } from "../../context/Expense";
import {
  storeExpense,
  putExpense,
  deleteExpense,
} from "../../services/ExpenseAPI";
import IconButton from "../../components/IconButton";
import { theme } from "../../constants/theme";
import ExpenseForm from "./ExpenseForm";
import Loading from "../../components/Loading";
import ErrorOverlay from "../../components/ErrorOverlay";

const ExpensesManagement = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { expenses, removeExpense, addExpense, updateExpense } =
    useContext(ExpenseContext);
  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId);
      removeExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense");
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await putExpense(expenseId, expenseData);
        updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ id, ...expenseData });
      }

      navigation.goBack();
    } catch (error) {
      setError("Could not save data");
      setIsSubmitting(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <Loading message={error} onConfirm={errorHandler} />;
  }

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
