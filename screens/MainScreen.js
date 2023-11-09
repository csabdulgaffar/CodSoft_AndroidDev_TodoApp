import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainScreen() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  // Load the saved todo list from AsyncStorage when the component mounts
  useEffect(() => {
    loadTodo();
  }, []);

  const loadTodo = async () => {
    try {
      const savedTodo = await AsyncStorage.getItem("todo");
      if (savedTodo !== null) {
        setTodo(JSON.parse(savedTodo));
      }
    } catch (error) {
      console.error("Error loading todo list: ", error);
    }
  };

  // Save the todo list to AsyncStorage whenever it changes
  useEffect(() => {
    saveTodo();
  }, [todo]);

  const saveTodo = async () => {
    try {
      await AsyncStorage.setItem("todo", JSON.stringify(todo));
    } catch (error) {
      console.error("Error saving todo list: ", error);
    }
  };

  const addTodo = () => {
    if (text.trim() !== "") {
      setTodo([...todo, { text, completed: false }]);
      setText("");
    }
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditedText(todo[index].text);
  };

  const saveEditedTodo = (index) => {
    const newTodo = [...todo];
    newTodo[index].text = editedText;
    setTodo(newTodo);
    setEditIndex(null); // Exit edit mode
  };

  const toggleComplete = (index) => {
    const newTodo = [...todo];
    newTodo[index].completed = !newTodo[index].completed;
    setTodo(newTodo);
  };

  const removeTodo = (index) => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
    setEditIndex(null); // Exit edit mode if deleting the task
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a new task"
        />
        <Button
          icon={<Icon name="plus" size={25} color="white" />}
          title="Add"
          onPress={addTodo}
          buttonStyle={{ backgroundColor: "#007BFF" }}
        />
      </View>

      <Text style={styles.heading}>Pending Tasks</Text>
      <FlatList
        data={todo.filter((t) => !t.completed)}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              onPress={() =>
                editIndex === index
                  ? saveEditedTodo(index)
                  : startEditing(index)
              }
            >
              {editIndex === index ? (
                <TextInput
                  style={styles.editInput}
                  value={editedText}
                  onChangeText={(newText) => setEditedText(newText)}
                  autoFocus={true}
                />
              ) : (
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.completedTask,
                  ]}
                >
                  {item.text}
                </Text>
              )}
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
              <Button
                icon={
                  <Icon
                    name={editIndex === index ? "check" : "edit"}
                    size={20}
                    color="white"
                  />
                }
                title=""
                onPress={() => {
                  if (editIndex === index) {
                    saveEditedTodo(index);
                  } else {
                    startEditing(index);
                  }
                }}
                buttonStyle={
                  editIndex === index
                    ? { backgroundColor: "#28a745" }
                    : { backgroundColor: "#007BFF" }
                }
              />
              <Button
                icon={<Icon name="trash" size={20} color="white" />}
                title=""
                onPress={() => removeTodo(index)}
                buttonStyle={{ backgroundColor: "#dc3545" }}
              />
              <Button
                icon={
                  <Icon
                    name={item.completed ? "check-circle" : "circle"}
                    size={20}
                    color="white"
                  />
                }
                title=""
                onPress={() => toggleComplete(index)}
                buttonStyle={{
                  backgroundColor: item.completed ? "#6c757d" : "#007BFF",
                }}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.heading}>Completed Tasks</Text>
      <FlatList
        data={todo.filter((t) => t.completed)}
        renderItem={({ item }) => (
          <Text style={[styles.taskText, styles.completedTask]}>
            {item.text}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#007BFF",
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#000",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ced4da",
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
    fontSize: 16,
  },
});
