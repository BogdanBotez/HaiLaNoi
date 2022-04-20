import { Rating } from "react-native-ratings";
import { View, StyleSheet, TextInput, Alert } from "react-native";
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

const Review = ({ navigation, route }) => {
  const [textInput, setTextInput] = useState(null);
  const [ratingInput, setRatingInput] = useState(null);
  const { locationID } = route.params;
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email, currentUserId } = storedCredentials;

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

  return (
    <StyledContainer>
      <Rating
        showRating
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
});

export default Review;
