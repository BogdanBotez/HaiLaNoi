import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from "./../components/styles";

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = ({ navigation, route }) => {
  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email, currentUserId } = storedCredentials;

  const clearLogin = () => {
    AsyncStorage.removeItem("currentUserCredentials")
      .then(() => {
        setStoredCredentials("");
        navigation.navigate("Logout");
      })
      .catch((error) => console.log(error));
  };

  //TODO
  const scanQR = () => {
    navigation.navigate("Scanare");
  };
  return (
    <WelcomeContainer>
      <PageTitle welcome={true}>Bine ai venit!</PageTitle>
      <SubTitle welcome={true}>{name || "Ion Ion"}</SubTitle>
      {/* <SubTitle welcome={true}>{email || "test@gmail.com"}</SubTitle> */}
      {/* <SubTitle welcome={true}>{currentUserId || "1"}</SubTitle> */}
      <StyledButton onPress={scanQR}>
        <ButtonText>Apasa pentru scanare</ButtonText>
      </StyledButton>
    </WelcomeContainer>
  );
};

export default Welcome;
