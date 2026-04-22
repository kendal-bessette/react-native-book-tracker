import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddBookScreen } from "./screens/AddBookScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryList"
        component={LibraryScreen}
        options={{ title: "Library" }}
      />
      <Stack.Screen
        name="AddBook"
        component={AddBookScreen}
        options={{ title: "Add Book", presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Library"
          component={LibraryStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
