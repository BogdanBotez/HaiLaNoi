import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

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
} from "./../components/styles";

import { View, ActivityIndicator } from "react-native";

//colors
const { brand, darkLight, primary } = Colors;

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//Api client
import axios from "axios";

import * as Google from "expo-google-app-auth";

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";

//Todo
const Login = ({ navigation, route }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  let currentUserId = null;

  useEffect(() => {
    clearLogin();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [route])
  );

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  const clearLogin = () => {
    AsyncStorage.removeItem("currentUserCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  const handleGoogleSignIn = () => {
    setGoogleSubmitting(true);
    const config = {
      iosClientId:
        "996685081623-ffajq1bahiqmv0ficftrt7qoc4o4h310.apps.googleusercontent.com",
      androidClientId:
        "996685081623-fh0qs1n2h7r4c1hfec55pvik8o0gmbq3.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then(async (result) => {
        const { type, user } = result;
        console.log(
          "1. Data from api call HandleGoogleSignIN : " + result.data
        );
        if (type == "success") {
          const { email, name } = user;
          //Daca user-ul este in Baza de date, se trece peste formular
          let isEmailRegistered = await setUserRegistered(email);
          console.log("isEmailRegistered: " + isEmailRegistered);
          if (isEmailRegistered) {
            persistLogin({ email, name, currentUserId }, message, "SUCCESS");
          } else {
            console.log(
              "6. Pentru a putea accesa contul va trebui sa completati un scurt formular."
            );
            setGoogleSubmitting(false);
            //Todo
            //useFormular();
          }
        } else {
          handleMessage(
            "Ne pare rau, autentificarea prin contul Google nu a reusit."
          );
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        handleMessage(
          "Eroare! Va rugam verificati conexiunea la internet si reincercati."
        );
        setGoogleSubmitting(false);
      });
  };

  //Verific daca exista user-ul in baza de date
  //ToDo -- schimba in api-ul pt google dupa ce se sterge user-ul duplicat din db si schimba functia intr-una generica
  // (adauga parametru de tip -- facebook/google/ios ca sa stii de unde vine)
  const setUserRegistered = async (currentUserEmail) => {
    console.log("2. isUserRegistered" + currentUserEmail);
    console.log("3. " + currentUserEmail);
    try {
      const resp = await axios.get(
        "http://cm2020.unitbv.ro/Turism4/api/Utilizators/GetUtilizatorByEmail",
        { params: { email: currentUserEmail } }
      );
      setCurrentUserId(resp);
      console.log(currentUserId);
      console.log("4. SetEmailCreatedTrue: ");
      return true;
    } catch (err) {
      console.log("4. SetEmailCreatedFalse: " + err);
    }
    return false;
  };

  const setCurrentUserId = (resp) => {
    currentUserId = resp.data.ID_Utilizator;
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem("currentUserCredentials", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
        navigation.navigate("Acasa");
      })
      .catch((error) => {
        console.log(error);
        handleMessage("Persisting login failed");
      });
  };

  //Remain logged in
  // if (storedCredentials != null) {
  //   console.log(storedCredentials.email);
  //   persistLogin(storedCredentials.email, message, "SUCCESS");
  // }

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            source={require("./../assets/img/logo.png")}
            resizeMode="contain"
          />

          <PageTitle>HaiLaNoi</PageTitle>
          <SubTitle>Autentificare</SubTitle>

          <Line />

          {!googleSubmitting && (
            <StyledButton google={true} onPress={handleGoogleSignIn}>
              <Fontisto name="google" color={primary} size={25} />
              <ButtonText> Login prin Google</ButtonText>
            </StyledButton>
          )}
          {googleSubmitting && (
            <StyledButton google={true} disabled={true}>
              <ActivityIndicator size="large" color={primary} />
            </StyledButton>
          )}
          <StyledButton
            facebook={true}
            onPress={
              () => {}
              // navigation.navigate("Login")
            }
          >
            <Fontisto name="facebook" color={"white"} size={25} />
            <ButtonText> Login prin Facebook</ButtonText>
          </StyledButton>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;
