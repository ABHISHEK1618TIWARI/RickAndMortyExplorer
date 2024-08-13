import React from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function CharacterDetailScreen({ route }) {
  const { characterId } = route.params;
  const [character, setCharacter] = React.useState(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Fetch character details from API
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data))
      .catch((error) => console.error(error));
  }, [characterId]);

  if (!character) return <Text>Loading...</Text>;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.details}>Status: {character.status}</Text>
      <Text style={styles.details}>Species: {character.species}</Text>
      <Text style={styles.details}>Gender: {character.gender}</Text>
      <Text style={styles.details}>Origin: {character.origin.name}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  details: {
    fontSize: 18,
    marginVertical: 5,
  },
});
