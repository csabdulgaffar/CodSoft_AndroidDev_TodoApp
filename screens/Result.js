import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import scienceQuestions from "../assets/QuizData";

const Result = ({ navigation, route }) => {
  const { score } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 50, color: "#fff" }}>Your Score</Text>

        <View style={styles.textWrapper}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.score}> / {scienceQuestions.length} </Text>
        </View>
        {/* Retry Quiz button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Welcome");
          }}
          style={styles.btnReset}
        >
          <Text style={styles.btnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    backgroundColor: "#000",
    width: "90%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 30,
  },
  score: {
    fontSize: 100,
    color: "#ffffff",
    fontWeight: "bold",
  },
  btnReset: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 15,
    width: "50%",
    borderRadius: 15,
  },
  btnText: {
    textAlign: "center",
    color: "#000",
    fontSize: 20,
    letterSpacing: 1,
  },
});
export default Result;
