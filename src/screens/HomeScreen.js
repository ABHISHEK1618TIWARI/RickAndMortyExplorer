import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1601641995914-7de69730a2d8",
      }} // High-quality background image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Rick and Morty Character Explorer</Text>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CharacterList", { status: "all" })
            }
          >
            <Image
              source={{
                uri: "https://image.shutterstock.com/image-photo/all-characters-260nw-1029524112.jpg",
              }} // Placeholder image
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <FontAwesome5 name="list" size={60} color="#fff" />
              <Text style={styles.cardTitle}>All Characters</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CharacterList", { status: "alive" })
            }
          >
            <Image
              source={{
                uri: "https://image.shutterstock.com/image-photo/alive-characters-260nw-1079685292.jpg",
              }} // Placeholder image
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <FontAwesome5 name="heartbeat" size={60} color="#fff" />
              <Text style={styles.cardTitle}>Alive Characters</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CharacterList", { status: "dead" })
            }
          >
            <Image
              source={{
                uri: "https://image.shutterstock.com/image-photo/dead-characters-260nw-1080592847.jpg",
              }} // Placeholder image
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <FontAwesome5 name="skull" size={60} color="#fff" />
              <Text style={styles.cardTitle}>Dead Characters</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay for better readability
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontFamily: "sans-serif",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  cardsContainer: {
    width: width * 0.9,
    alignItems: "center",
  },
  card: {
    width: width * 0.9,
    height: 160,
    backgroundColor: "#333",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.4,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});
