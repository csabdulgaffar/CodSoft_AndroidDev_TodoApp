import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const SelectQuiz = ({ navigation }) => {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  const [progress, setProgress] = useState(new Animated.Value(0));
  const startQuiz = () => {
    // Animated.timing(fadeAnim,{
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: false
    // }).start();
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1900,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.timing(progress, {
      toValue: 0 + 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/welcome2.jpg")} />

      <View style={styles.subContainer}>
        <Text style={styles.text}>Select Quiz</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("QuizPage");
          startQuiz();
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Science</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Quiz");
          startQuiz();
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Maths</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Quiz");
          startQuiz();
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>General Knowledge</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItem: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItem: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  btn: {
    // backgroundColor: "#d5bf96",
    marginTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 15,
    // width: "50%",
    position: "relative",
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    letterSpacing: 1.1,
  },
});
export default SelectQuiz;
