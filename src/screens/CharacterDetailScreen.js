import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CharacterDetailScreen({ route }) {
  const { characterId } = route.params;
  const [character, setCharacter] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data))
      .catch((error) => console.error(error));
  }, [characterId]);

  const handleFavorite = async () => {
    try {
      let storedFavorites = await AsyncStorage.getItem("favorites");
      storedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      if (!storedFavorites.some((item) => item.id === character.id)) {
        storedFavorites.push(character);
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(storedFavorites)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!character) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.details}>
        Status: <Text style={styles.detailValue}>{character.status}</Text>
      </Text>
      <Text style={styles.details}>
        Species: <Text style={styles.detailValue}>{character.species}</Text>
      </Text>
      <Text style={styles.details}>
        Gender: <Text style={styles.detailValue}>{character.gender}</Text>
      </Text>
      <Text style={styles.details}>
        Origin: <Text style={styles.detailValue}>{character.origin.name}</Text>
      </Text>
      <Button
        title="Add to Favorites"
        onPress={handleFavorite}
        color="#ff6347"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#222",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#ff6347",
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
    textAlign: "center",
  },
  details: {
    fontSize: 20,
    color: "#aaa",
    marginVertical: 5,
    textAlign: "center",
  },
  detailValue: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
