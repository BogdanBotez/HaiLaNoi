import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import {
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
    var date = new Date();
    postTransaction(date);
    console.log(date);
  }, []);

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

  return (
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
