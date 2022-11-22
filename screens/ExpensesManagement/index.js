import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect } from "react";

import { ExpenseContext } from "../../context/Expense";
import IconButton from "../../components/IconButton";
import { theme } from "../../constants/theme";
import CustomButton from "../../components/CustomButtom";

const ExpensesManagement = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;

  const isEditing = !!expenseId;
  const { deleteExpense, addExpense, updateExpense } =
    useContext(ExpenseContext);

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
  const confirmHandler = () => {
    if (isEditing) {
      updateExpense(expenseId, {
        description: "updated",
        amount: 10.0,
        date: new Date(),
      });
    } else {
      addExpense({
        description: `test-${Math.random().toFixed(3)}`,
        amount: 10.9,
        date: new Date(),
        id: Math.random().toString(),
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <CustomButton mode="flat" onPress={cancelHandler}>
          Cancel
        </CustomButton>
        <CustomButton onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </CustomButton>
      </View>
      {isEditing && (
        <IconButton
          name="trash"
          color={theme.colors.error[100]}
          size={36}
          onPress={deleteHandler}
        />
      )}
    </View>
  );
};

export default ExpensesManagement;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    lignItems: "center",
  },
});
