import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../../../constants/theme";
import { getFormattedDate } from "../../../../utils/date";

const Item = ({ expense }) => {
  const navigation = useNavigation();

  const expanseHandler = () => {
    navigation.navigate("Management", { expenseId: expense.id });
  };

  return (
    <Pressable onPress={expanseHandler}>
      <View style={styles.itemContainer}>
        <Text>{expense.description}</Text>
        <Text>{getFormattedDate(expense.date)}</Text>
        <Text>${expense.amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 6,
    elevation: 4,
    shadowColor: theme.colors.primary[20],
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
});
