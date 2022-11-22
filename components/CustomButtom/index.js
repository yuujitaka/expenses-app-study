import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../constants/theme";

const CustomButton = ({ children, onPress, mode }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.button, mode == "flat" && styles.flatButton]}>
        <Text style={[styles.buttonText, mode == "flat" && styles.flatText]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: theme.colors.primary[100],
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatButton: {
    backgroundColor: "transparent",
  },
  flatText: {
    color: theme.colors.primary[100],
  },
});
