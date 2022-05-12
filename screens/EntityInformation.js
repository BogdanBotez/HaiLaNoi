import React, { useState, useContext, useEffect } from "react";
import { Rating } from "react-native-ratings";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  StatusBar,
} from "react-native";
import { ListItem } from "react-native-elements";

import axios from "axios";

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

const getEntityStatsAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Stats/EntityStats_RatingsScorVizite";

const getEntityReviewsAPI =
  "http://cm2020.unitbv.ro/Turism4/api/RatingUtilizatorEntities/RatingUtilizatorEntityListByEntity";

const getEntityByIdAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Entities/GetEntity/";

const EntityInformation = ({ navigation, route }) => {
  const [reviews, setReviews] = useState("");
  const [EntityLogoURL, setEntityLogoURL] = useState("");
  const { entityID, entityName } = route.params;
  const [entityReviews, setEntityReviews] = useState(null);
  const [entityVisits, setEntityVisits] = useState(null);
  const [entityTourists, setEntityTourists] = useState(null);
  const [entityScore, setEntityScore] = useState(null);

  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email, currentUserId } = storedCredentials;

  console.log("/n ENTITY INFORMATION:");
  console.log(entityID);
  console.log(entityName);

  useEffect(() => {
    getAllEntities();
    getLast10Reviews();
    getEntityById();
  }, [entityName]);

  const getEntityById = async () => {
    try {
      const resp = await axios.get(getEntityByIdAPI + entityID);
      setEntityLogoURL(resp.data.urlIconHarta);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllEntities = async () => {
    try {
      const resp = await axios.get(getEntityStatsAPI);
      findSelectedEntity(resp.data);
      //splitEntityLogoURL(resp.data[1].urlPozaPrincipala);
    } catch (err) {
      console.log(err);
    }
  };

  const getLast10Reviews = async () => {
    try {
      const resp = await axios.get(getEntityReviewsAPI + "?", {
        params: {
          ID_ENTITY: parseInt(entityID),
          NrInregDeReturnat: 10,
        },
      });
      setReviews(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  function findSelectedEntity(resp) {
    let entity = resp.find((el) => el.ENTITY_NAME === entityName);
    setEntityDetails(entity);
  }

  function setEntityDetails(entity) {
    setEntityReviews(entity.ratinguri);
    setEntityScore(entity.scor_mediu);
    setEntityVisits(entity.vizite);
    setEntityTourists(entity.turisti);
    formatEntityLogoURL(entity);
  }

  function formatEntityLogoURL(entity) {
    if (entity.ID_ENTITY_TYPE === 3) {
      //Todo
    } else {
      // imgSource = LogoImages.BrutariaSimplu.uri;
      // console.log(LogoImages.BrutariaSimplu.uri);
      // console.log("imgSource :");
      // setEntityLogoURL(entitiesLogoPATH + nameWithoutSpace + imageExtensionPNG);
      // console.log(entitiesLogoPATH + nameWithoutSpace + imageExtensionPNG);
      // string = entitiesLogoPATH + nameWithoutSpace + imageExtensionPNG;
    }
  }

  const getDateSubstring = (fullDate) => {
    var date = fullDate.substring(0, 10);
    return date;
  };

  const getTimeSubstring = (fullDate) => {
    var date = fullDate.substring(11, 16);
    return date;
  };

  return (
    <StyledContainer backgroundColor="#ffffff">
      <ScrollView>
        {/* <View style={styles.imageContainer}> */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "http://cm2020.unitbv.ro/Turism4" + EntityLogoURL,
            }}
            style={styles.image}
          />
        </View>

        <Text style={styles.detailsText}>
          Numar total de vizite: {entityVisits}
        </Text>
        <Text style={styles.detailsText}>
          Numar total de turisti: {entityTourists}
        </Text>
        <Text style={styles.detailsText}>
          Numar total de review-uri: {entityReviews}
        </Text>
        <Rating
          readonly={true}
          minValue={1}
          showRating
          fractions={2}
          startingValue={entityScore}
          style={{ paddingVertical: 10 }}
        />
        <Line />
        <Text style={styles.detailsText}>Recenzii</Text>
        <View>
          <FlatList
            scrollEnabled={false}
            itemSeparatorComponent={() => <View style={styles.separator} />}
            data={reviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Rating
                  //style={styles.ratingReview}
                  tintColor={"#f4f0ec"}
                  readonly={true}
                  minValue={1}
                  startingValue={item.Scor}
                />
                <Text style={styles.italicText}>{item.Comentariu}</Text>
                <Text style={styles.dataAlign}>
                  {getDateSubstring(item.DataOra.toString())}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   paddingTop: 10,
  //   paddingBottom: 20,
  //   backgroundColor: "#ffffff",
  // },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  },
  dataAlign: { textAlign: "right" },

  detailsText: {
    fontSize: 18,
    marginHorizontal: 2,
    fontWeight: "bold",
    textAlign: "center",
  },
  italicText: {
    fontStyle: "italic",
  },
  item: {
    textAlign: "center",
    marginTop: 20,
    padding: 10,
    marginHorizontal: 0,
    paddingHorizontal: 10,
    backgroundColor: "#f4f0ec",
    fontSize: 14,
    borderRadius: 20,
  },
  imageContainer: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1, // pushes the footer to the end of the screen
  },
});

export default EntityInformation;
