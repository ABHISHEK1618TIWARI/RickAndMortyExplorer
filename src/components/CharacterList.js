import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

export default function CharacterList({ route, navigation }) {
  const { status } = route.params;
  const [characters, setCharacters] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("All");

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character`, {
        params: {
          status: status !== "All" ? status : undefined,
          species: selectedSpecies !== "All" ? selectedSpecies : undefined,
        },
      })
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [status, selectedSpecies]);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedSpecies}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedSpecies(itemValue)}
        >
          <Picker.Item label="All Species" value="All" />
          <Picker.Item label="Human" value="Human" />
          <Picker.Item label="Alien" value="Alien" />
        </Picker>
      </View>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CharacterDetail", { characterId: item.id })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.species}>{item.species}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  filterContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  card: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  species: {
    fontSize: 16,
    color: "#666",
  },
});
