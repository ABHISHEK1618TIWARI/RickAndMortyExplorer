import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import CharacterListScreen from "./src/screens/CharacterListScreen";
import CharacterDetailScreen from "./src/screens/CharacterDetailScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CharacterList" component={CharacterListScreen} />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
        />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
