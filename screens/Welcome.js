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
  const scanQR = () => {};
  return (
    <InnerContainer>
      {/* <StatusBar style="light" /> */}

      <WelcomeContainer>
        <PageTitle welcome={true}>Bine ai venit!</PageTitle>
        <SubTitle welcome={true}>{name || "Ion Ion"}</SubTitle>
        <SubTitle welcome={true}>{email || "test@gmail.com"}</SubTitle>
        <SubTitle welcome={true}>{currentUserId || "1"}</SubTitle>
        <StyledFormArea>
          <StyledButton onPress={scanQR}>
            <ButtonText>Apasa pentru scanare</ButtonText>
          </StyledButton>
          <Line />
          <StyledButton onPress={clearLogin}>
            <ButtonText>Delogare</ButtonText>
          </StyledButton>
        </StyledFormArea>
      </WelcomeContainer>
    </InnerContainer>
  );
};

export default Welcome;
