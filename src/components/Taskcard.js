import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const LIST_ITEM_HEIGHT = 55;

const TaskCard = ({ text, onDismissTaskHandler }) => {
  const pressed = useSharedValue(false);
  const translateX = useSharedValue(0);
  const previousX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const itemOpacity = useSharedValue(1);

  const { width: ScreenWidth } = Dimensions.get("window");
  const translateXLimit = -ScreenWidth * 0.2;

  const gesture = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      translateX.value = event.translationX + previousX.value;
    })
    .onFinalize(() => {
      const dismissed = translateX.value < translateXLimit;
      if (dismissed && pressed.value) {
        translateX.value = withTiming(-ScreenWidth);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        itemOpacity.value = withTiming(0, undefined, (isFineshed) => {
          if (isFineshed && onDismissTaskHandler) {
            runOnJS(onDismissTaskHandler)(text);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
      pressed.value = false;
    });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });
  const trashIconStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < translateXLimit ? 1 : 0);
    return { opacity };
  });
  const taskStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: itemOpacity.value,
    };
  });

  return (
    <GestureHandlerRootView>
      <Animated.View style={[taskStyle]}>
        <Animated.View style={[styles.trashIcon, trashIconStyle]}>
          <FontAwesome5
            name={"trash-alt"}
            size={LIST_ITEM_HEIGHT * 0.5}
            color="red"
          ></FontAwesome5>
        </Animated.View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.container, containerStyle]}>
            <Text style={styles.title}> {text}</Text>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "#fff",
    borderColor: "black",
    borderStyle: "solid",
    padding: 15,
    elevation: 5,
  },
  title: { fontSize: 20 },
  trashIcon: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: "absolute",
    right: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(TaskCard);
