import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function CButton({ text, cStyle, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, cStyle]} onPress={onPress}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {text ? text : "CButton"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "#fff",
    borderColor: "black",
    borderStyle: "solid",
    padding: 15,
    elevation: 5,
  },
});
