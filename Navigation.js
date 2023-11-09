import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TodoListScreen from "./screens/TodoListScreen";
import AddTodoScreen from "./screens/AddTodoScreen";

const AppNavigator = createStackNavigator(
  {
    TodoList: { screen: TodoListScreen },
    AddTodo: {
      screen: AddTodoScreen,
      params: {
        addTodo: (newTodo) => {}, // Implement this function to add a new task
      },
    },
  },
  {
    initialRouteName: "TodoList",
  }
);

export default createAppContainer(AppNavigator);
