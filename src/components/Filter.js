import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Filter({ applyFilter }) {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by:</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(value) => {
          setSelectedValue(value);
          applyFilter({ status: value });
        }}
      >
        <Picker.Item label="All" value="" />
        <Picker.Item label="Alive" value="alive" />
        <Picker.Item label="Dead" value="dead" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
