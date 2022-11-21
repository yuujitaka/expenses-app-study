import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExpensesOverview from "./screens/ExpensesOverview";
import ExpensesManagement from "./screens/ExpensesManagement";
import RecentExpenses from "./screens/RecentExpenses";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesTab = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Recent" component={RecentExpenses} />
      <BottomTabs.Screen name="Overview" component={ExpensesOverview} />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ExpensesTabs" component={ExpensesTab} />
        <Stack.Screen name="Management" component={ExpensesManagement} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
