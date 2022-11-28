import { View, StyleSheet,Text } from "react-native";

import { theme } from "../../constants/theme";
import CustomButton from "../CustomButtom";

const ErrorOverlay = ({message, onConfirm}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <CustomButton onPress={onConfirm}>Okay</CustomButton>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary[100],
  },
  text: {
    textAlign: 'center',
  },
});