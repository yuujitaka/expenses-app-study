import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ExpensesOverview from "./screens/ExpensesOverview";
import ExpensesManagement from "./screens/ExpensesManagement";
import RecentExpenses from "./screens/RecentExpenses";
import { theme } from "./constants/theme";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesTab = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary[100] },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: theme.colors.primary[100] },
        tabBarActiveTintColor: theme.colors.primary[20],
      }}
    >
      <BottomTabs.Screen
        name="Recent"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Overview"
        component={ExpensesOverview}
        options={{
          title: "Overview Expenses",
          tabBarLabel: "Overview",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesTabs"
            component={ExpensesTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Management" component={ExpensesManagement} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
