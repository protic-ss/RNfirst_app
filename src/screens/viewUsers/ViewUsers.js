import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import CButton from "../../components/CButton";
const getUser = gql`
  query GetAllUser {
    getAllUser {
      id
      name
    }
  }
`;
export default function ViewUsers() {
  const { loading, error, data } = useQuery(getUser);

  useEffect(() => {
    console.log(loading, error, data?.getAllUser);
  }, [loading]);
  return (
    <View>
      <FlatList
        style={styles.listContainer}
        data={data?.getAllUser}
        renderItem={({ item }) => (
          <CButton
            text={item.name}
            cStyle={{ padding: 20, margin: 10 }}
            // onPress={() => navigation.navigate("ViewUsers")}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
