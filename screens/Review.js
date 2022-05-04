import { Rating } from "react-native-ratings";
import { View, StyleSheet, TextInput, Alert, Image } from "react-native";
import React, { useState, useContext, useEffect, Component } from "react";

import {
  StyledContainer,
  InnerContainer,
  WelcomeContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  LeftIcon,
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
} from "./../components/styles";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const Review = ({ navigation, route }) => {
  const [textInput, setTextInput] = useState(null);
  const [ratingInput, setRatingInput] = useState(null);
  const { locationID } = route.params;
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email, currentUserId } = storedCredentials;
  const [pickedImagePath, setPickedImagePath] = useState("");

  const setEntityRating = (rating) => {
    setRatingInput(rating);
  };

  const setReviewMessage = (text) => {
    setTextInput(text);
  };

  const postReview = async () => {
    if (ratingInput === null) {
      showMandatoryInput();
      logPostBody();
    } else {
      var date = convertUTCDateToLocalDate(new Date());
      console.log(date);
      try {
        const resp = await axios.post(
          "http://cm2020.unitbv.ro/Turism4/api/RatingUtilizatorEntities/PostRatingUtilizatorEntity",
          {
            ID_Utilizator: parseInt(currentUserId),
            ID_ENTITY: parseInt(locationID),
            Scor: parseInt(ratingInput),
            DataOra: date,
            Comentariu: textInput,
          }
        );
        console.log(
          "post review response: " +
            resp.data.ID_Utilizator +
            " " +
            resp.data.Comentariu +
            " " +
            "ID_RatingUtilizatorEntity" +
            resp.data.ID_RatingUtilizatorEntity
        );
      } catch (err) {
        console.log(err);
      }

      logPostBody();
    }
  };

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  const logPostBody = () => {
    console.log(
      "nota: " +
        ratingInput +
        "\n" +
        "Id user: " +
        currentUserId +
        "\n" +
        "locationID: " +
        locationID +
        "\n" +
        "message: " +
        textInput
    );
  };

  const showMandatoryInput = () => {
    return Alert.alert("Eroare", "Va rugam selectati o nota.", [
      {
        text: "Am inteles",
      },
    ]);
  };

  const openGallery = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    console.log("launchCameraAsync");
    let result = await ImagePicker.launchCameraAsync();

    console.log("Result: ");
    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log("Result.uri: " + result.uri);
      //console.log(result.uri);
    }
  };

  return (
    <StyledContainer>
      <Rating
        minValue={1}
        showRating
        defaultRating={3}
        onFinishRating={setEntityRating}
        style={{ paddingVertical: 10 }}
      />

      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          placeholderTextColor="grey"
          numberOfLines={4}
          multiline={true}
          onChangeText={(text) => setReviewMessage(text)}
        />
      </View>

      <StyledButton onPress={() => postReview()}>
        <ButtonText>Adauga Recenzie</ButtonText>
      </StyledButton>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <StyledButton onPress={() => openCamera()}>
          <ButtonText>Camera</ButtonText>
        </StyledButton>
        <Text>
          Pentru ca validarea sa fie completa, va rugam sa adaugati o poza cu
          bonul.
        </Text>
        <StyledButton onPress={() => openGallery()}>
          <ButtonText>Galerie</ButtonText>
        </StyledButton>
      </View>

      <View style={styles.imageContainer}>
        {pickedImagePath !== "" && (
          <Image source={{ uri: pickedImagePath }} style={styles.image} />
        )}
      </View>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: Colors.darkLight,
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: "contain",
  },
});

export default Review;
