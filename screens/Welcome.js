import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

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

const Welcome = () => {
  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email } = storedCredentials;

  const clearLogin = () => {
    AsyncStorage.removeItem("currentUserCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          source={require("./../assets/img/brasov_welcome.jpg")}
          resizeMode="contain"
        />

        <WelcomeContainer>
          <PageTitle welcome={true}>Bine ai venit!</PageTitle>
          <SubTitle welcome={true}>{name || "Ion Ion"}</SubTitle>
          <SubTitle welcome={true}>{email || "test@gmail.com"}</SubTitle>
          <StyledFormArea>
            <Line />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Delogare</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
