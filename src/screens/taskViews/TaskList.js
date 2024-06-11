import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./styles";
import Taskcard from "../../components/Taskcard";

const TaskList = [
  { id: "t1", title: "Learning React Native 2" },
  { id: "t2", title: "Implementing React Native 1" },
  { id: "t3", title: "TODO List in React Native 2" },
  { id: "t4", title: "TODO List in React Native 1" },
];

export default function TaskView({ navigation }) {
  // npm run android --active-arch-only
  const [tasks, setTasks] = useState(TaskList);
  const [modalVisible, setModalVisible] = useState(false);
  const [textTask, onChangeTextTask] = useState("");

  const onPress = () => {
    if (textTask) {
      setTasks([...tasks, { id: Date.now(), title: textTask }]);
      onChangeTextTask("");
    }
    setModalVisible(!modalVisible);
  };

  const onDismissTaskHandler = (text) => {
    setTasks(tasks?.filter((item) => item.title !== text));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <FlatList
        style={styles.listContainer}
        data={tasks}
        renderItem={({ item }) => (
          <Taskcard
            text={item.title}
            onDismissTaskHandler={onDismissTaskHandler}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Entypo name="add-to-list" size={25} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add task</Text>
            <TextInput
              placeholder="Task name"
              style={styles.input}
              onChangeText={onChangeTextTask}
              value={textTask}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPress}
            >
              <Text style={styles.textStyle}>Close Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
