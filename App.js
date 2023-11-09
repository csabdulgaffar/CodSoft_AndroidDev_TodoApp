import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import SelectQuiz from "./screens/SelectQuiz";
import QuizPage from "./screens/QuizPage";
import Result from "./screens/Result";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectQuiz"
          component={SelectQuiz}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuizPage"
          component={QuizPage}
          options={{
            title: "Questions",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              color: "#000",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Result"
          component={Result}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
