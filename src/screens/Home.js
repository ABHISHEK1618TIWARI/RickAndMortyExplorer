// src/screens/Home.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty Character Explorer</Text>
      <Button
        title="View All Characters"
        onPress={() => navigation.navigate("AllCharacters")}
      />
      <Button
        title="View Alive Characters"
        onPress={() => navigation.navigate("AliveCharacters")}
      />
      <Button
        title="View Dead Characters"
        onPress={() => navigation.navigate("DeadCharacters")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
