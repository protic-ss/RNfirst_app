import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView as WView } from "react-native-webview";

const WebView = () => {
  return (
    <WView source={{ uri: "https://reactnative.dev/" }} style={{ flex: 1 }} />
  );
};

export default WebView;

const styles = StyleSheet.create({});
