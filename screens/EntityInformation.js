import React, { useState, useContext, useEffect } from "react";

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { ListItem } from "react-native-elements";

import axios from "axios";

const getEntityStats =
  "http://cm2020.unitbv.ro/Turism4/api/Stats/EntityStats_RatingsScorVizite";

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLinkContent,
  TextLink,
  WelcomeImage,
} from "./../components/styles";

const EntityInformation = ({ navigation, route }) => {
  const [entities, setEntities] = useState("");
  const [EntityLogo, setEntityLogo] = useState("");
  const { entityID, entityName } = route.params;
  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email, currentUserId } = storedCredentials;

  console.log("/n ENTITY INFORMATION:");

  const getAllEntities = async () => {
    try {
      const resp = await axios.get(getEntityStats);
      findSelectedEntity(resp.data);
      //splitEntityLogoURL(resp.data[1].urlPozaPrincipala);
    } catch (err) {
      console.log(err);
    }
  };

  function findSelectedEntity(resp) {
    let entity = resp.find((el) => el.ENTITY_NAME === entityName);
    console.log("Correct entity: ");
    console.log(entity);
  }

  const splitEntityLogoURL = (input) => {
    const [path, path2, imgURL] = input.split("/");
    console.log(imgURL);
    setEntityLogo(imgURL);
  };

  console.log("EntityLogo: " + EntityLogo);
  return (
    <StyledContainer>
      <Line />
      <Line />
      <Button title="Test" onPress={getAllEntities}></Button>

      <View style={styles.imageContainer}>
        {EntityLogo !== "" && (
          <Image
            source={require("./../assets/img/logo.png")}
            // source={{
            //   uri: "http://cm2020.unitbv.ro/pozeLocatii/cafeCentral1.jpg",
            // }}
            style={styles.image}
          />
        )}
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
  imageContainer: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1, // pushes the footer to the end of the screen
  },
});

export default EntityInformation;
