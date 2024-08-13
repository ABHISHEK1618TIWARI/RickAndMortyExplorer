import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function CharacterListScreen({ route, navigation }) {
  const { status } = route.params;
  const [characters, setCharacters] = React.useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState(status || "all");
  const [selectedSpecies, setSelectedSpecies] = React.useState("All");
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const params = {
          status: selectedStatus === "all" ? undefined : selectedStatus,
          species: selectedSpecies !== "All" ? selectedSpecies : undefined,
        };

        const response = await axios.get(
          "https://rickandmortyapi.com/api/character",
          { params }
        );
        setCharacters(response.data.results);
      } catch (error) {
        setError("Failed to load characters. Please try again later.");
        console.error(error);
      }
    };

    fetchCharacters();
  }, [selectedStatus, selectedSpecies]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.filterLabel}>Status:</Text>
          <Picker
            selectedValue={selectedStatus}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          >
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Alive" value="alive" />
            <Picker.Item label="Dead" value="dead" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.filterLabel}>Species:</Text>
          <Picker
            selectedValue={selectedSpecies}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSpecies(itemValue)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Human" value="Human" />
            <Picker.Item label="Alien" value="Alien" />
            {/* Add more species options here if needed */}
          </Picker>
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
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
        contentContainerStyle={styles.list}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#1a1a1a", // Darker background color
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#2c2c2c", // Darker background for filter container
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#3d3d3d", // Slightly lighter background for picker containers
    borderRadius: 10,
    overflow: "hidden",
    borderColor: "#444",
    borderWidth: 1,
  },
  filterLabel: {
    fontSize: 16,
    color: "#e0e0e0", // Light color for text
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#4d4d4d", // Darker background for filter label
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#e0e0e0", // Light color for picker text
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#2c2c2c", // Darker background for cards
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e0e0e0", // Light color for character names
  },
  species: {
    fontSize: 18,
    color: "#ccc", // Light color for species
  },
  error: {
    color: "#ff6f61",
    textAlign: "center",
    marginVertical: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 10,
  },
});
