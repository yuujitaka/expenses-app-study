import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ExpenseContextProvider from "./context/Expense";
import ExpensesOverview from "./screens/ExpensesOverview";
import ExpensesManagement from "./screens/ExpensesManagement";
import RecentExpenses from "./screens/RecentExpenses";
import { theme } from "./constants/theme";
import IconButton from "./components/IconButton";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesTab = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme.colors.primary[100] },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: theme.colors.primary[100] },
        tabBarActiveTintColor: theme.colors.primary[20],
        headerRight: ({ tintColor }) => (
          <IconButton
            name="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("Management")}
          />
        ),
      })}
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
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: theme.colors.primary[100] },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesTabs"
              component={ExpensesTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Management"
              component={ExpensesManagement}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}
