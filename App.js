import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import Home from "./src/screens/home";
import TaskView from "./src/screens/taskViews";
import Counter from "./src/screens/counter";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import ViewUsers from "./src/screens/viewUsers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTab from "./src/screens/bottomTab/BottomTab";
import WebView from "./src/screens/webView/WebView";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const client = new ApolloClient({
  uri: "http://192.168.4.36:8000/graphql/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home">
              {(props) => <Home {...props} extraData={"someData"} />}
            </Stack.Screen>
            <Stack.Screen
              name="TaskList"
              component={TaskView}
              options={{ title: "My tasks" }}
            />
            <Stack.Screen
              name="Counter"
              component={Counter}
              options={{ title: "Counter with Redux" }}
            />
            <Stack.Screen
              name="ViewUsers"
              component={ViewUsers}
              options={{ title: "view Users from API" }}
            />
            <Stack.Screen
              name="BottomTab"
              component={BottomTab}
              options={{ title: "bottom tab nav" }}
            />
            <Stack.Screen
              name="WebView"
              component={WebView}
              options={{ title: "web view" }}
            />
          </Stack.Navigator>
          {/* <Tab.Navigator>
            <Tab.Screen name="Counter" component={Counter} />
            <Tab.Screen name="ViewUsers" component={ViewUsers} />
          </Tab.Navigator> */}
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}
