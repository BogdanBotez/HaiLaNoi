import React, { useState, useContext, useEffect, Component } from "react";

import { StyleSheet, View, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";

import axios from "axios";

const getEntitiesAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Entities/GetEntities";

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "native-base";

const Entities = ({ navigation, route }) => {
  const [entities, setEntities] = useState("");

  useEffect(() => {
    getAllEntities();
  }, []);

  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email, currentUserId } = storedCredentials;

  const getAllEntities = async () => {
    try {
      const resp = await axios.get(getEntitiesAPI);
      console.log(entities);
      setEntities(resp.data);
      console.log(entities);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        itemSeparatorComponent={() => <View style={styles.separator} />}
        data={entities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          ({ item }) => (
            <Text style={styles.item}>
              {item.ENTITY_NAME} , Nota: {item.RatingCurent}
            </Text>
          )
          // return (
          //   <ListItem
          //     title={item.ENTITY_NAME}
          //     //title={"${item.ENTITY_NAME} (${item.RatingCurent})"}
          //     // onPress={() => {}}
          //   />
          // );
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#ffffff",
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  },
  item: {
    marginTop: 20,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "#F5FCFF",
    fontSize: 12,
  },
});

export default Entities;
