import React, { useState, useContext, useEffect } from "react";

import { StyleSheet, View, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";

import axios from "axios";

const getEntitiesAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Entities/GetEntities";

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";

import { StyledContainer } from "./../components/styles";

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
    <StyledContainer>
      <View style={styles.container}>
        <FlatList
          itemSeparatorComponent={() => <View style={styles.separator} />}
          data={entities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({ item }) => <Text style={styles.item}>{item.ENTITY_NAME}</Text>
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
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  },
  item: {
    textAlign: "center",
    marginTop: 20,
    padding: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFA500",
    fontSize: 20,
  },
});

export default Entities;
