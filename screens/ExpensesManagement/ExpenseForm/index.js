import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import { getFormattedDate } from "../../../utils/date";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButtom";
import { theme } from "../../../constants/theme";

const ExpenseForm = ({ selectedExpense, onSubmit, onCancel }) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: selectedExpense?.amount.toString() || "",
      isValid: true,
    },
    date: {
      value: getFormattedDate(selectedExpense?.date) || "",
      isValid: true,
    },
    description: {
      value: selectedExpense?.description ?? "",
      isValid: true,
    },
  });

  const inputChangeHandler = (identifier, value) => {
    setInputValues((current) => ({
      ...current,
      [identifier]: { value, isValid: true },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((current) => ({
        amount: { ...current.amount, isValid: amountIsValid },
        date: { ...current.date, isValid: dateIsValid },
        description: { ...current.description, isValid: descriptionIsValid },
      }));

      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.container}>
      <CustomInput
        label="Amount"
        inputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: (text) => inputChangeHandler("amount", text),
          value: inputValues.amount.value,
        }}
        error={!inputValues.amount.isValid}
      />
      <CustomInput
        label="Date"
        inputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: (text) => inputChangeHandler("date", text),
          value: inputValues.date.value,
        }}
        error={!inputValues.date.isValid}
      />
      <CustomInput
        label="Description"
        inputConfig={{
          multiline: true,
          onChangeText: (text) => inputChangeHandler("description", text),
          value: inputValues.description.value,
        }}
        error={!inputValues.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Check the inputs with error</Text>
      )}
      <View style={styles.buttons}>
        <CustomButton mode="flat" onPress={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton onPress={submitHandler}>
          {selectedExpense ? "Update" : "Add"}
        </CustomButton>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: theme.colors.error[100],
    marginTop: 4,
    marginBottom: 16,
  },
});
