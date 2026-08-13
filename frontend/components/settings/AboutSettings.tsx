import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutSettings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About SwiftReply</Text>
      <Text style={styles.text}>AI-powered communication assistant for faster, smarter conversations.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  text: {
    color: "#6B7280",
    lineHeight: 22,
  },
});
