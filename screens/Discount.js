import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

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

const Discount = ({ navigation, route }) => {
  const { locationID, locationName } = route.params;
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email, currentUserId } = storedCredentials;

  useEffect(() => {
    var date = convertUTCDateToLocalDate(new Date());
    postTransaction(date);
    console.log(date);
  }, []);

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  const postTransaction = async (date) => {
    try {
      await axios.post(
        "http://cm2020.unitbv.ro/Turism4/api/Tranzacties/PostTranzactie",
        {
          ID_UItilizator: parseInt(currentUserId),
          ID_ENTITY: parseInt(locationID),
          DataOra: date,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const redirectReview = () => {
    navigation.navigate("Review", {
      locationID: locationID,
    });
  };

  return (
    <StyledContainer>
      <InnerContainer>
        <WelcomeContainer>
          <PageTitle welcome={true}>Felicitari!</PageTitle>
          <SubTitle welcome={true}>
            {"In baza acestui mesaj poti primi un discount de 10% pentru urmatoarea locatie: " +
              locationName}
          </SubTitle>
          <SubTitle welcome={true}>
            Pentru a beneficia de discount, arata-i acest mesaj unui ospatar.
          </SubTitle>
        </WelcomeContainer>
        <StyledButton onPress={() => redirectReview()}>
          <ButtonText>Adauga un review</ButtonText>
        </StyledButton>
      </InnerContainer>
    </StyledContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default Discount;
