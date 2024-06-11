import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Text, Button } from "react-native";
import { styles } from "./styles";
import CButton from "../../components/CButton";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <CButton
        text="Task List"
        cStyle={{ padding: 20, margin: 10 }}
        onPress={() => navigation.navigate("TaskList")}
      ></CButton>
      <CButton
        text="Counter with Redux"
        cStyle={{ padding: 20, margin: 10 }}
        onPress={() => navigation.navigate("Counter")}
      />
      <CButton
        text="View Users from API"
        cStyle={{ padding: 20, margin: 10 }}
        onPress={() => navigation.navigate("ViewUsers")}
      />
      <CButton
        text="Bottom Tab Nav"
        cStyle={{ padding: 20, margin: 10 }}
        onPress={() => navigation.navigate("BottomTab")}
      />
      <CButton
        text="Web View"
        cStyle={{ padding: 20, margin: 10 }}
        onPress={() => navigation.navigate("WebView")}
      />
    </SafeAreaView>
  );
}
