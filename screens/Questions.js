import React from "react";
import { View, StyleSheet, Text } from "react-native";
import scienceQuestions from "../assets/QuizData";

const Questions = ({ index, question }) => {
  return (
    <View style={{}}>
      {/* Question Counter */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{ color: "#333", fontSize: 15, opacity: 0.6, marginRight: 2 }}
        >
          {index + 1}
        </Text>
        <Text style={{ color: "#333", fontSize: 13, opacity: 0.6 }}>
          / {scienceQuestions.length}
        </Text>
      </View>

      {/* Question */}
      <Text
        style={{
          color: "#000",
          fontSize: 18,
          textAlign: "center",
        }}
      >
        {question}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Questions;
