import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../../constants/theme";

const CustomInput = ({ label, inputConfig, error }) => {
  const isMultiline = !!inputConfig?.multiline;

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, error && styles.errorLabel]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isMultiline && styles.inputMultiline,
          error && styles.errorInput,
        ]}
        {...inputConfig}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    backgroundColor: theme.colors.primary[10],
    color: theme.colors.primary[100],
    padding: 8,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorLabel: {
    color: theme.colors.error[100],
  },
  errorInput: {
    backgroundColor: theme.colors.error[50],
  },
});
