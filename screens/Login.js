import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import { BackHandler, Image, StyleSheet, Alert } from "react-native";
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
  WelcomeImage,
} from "./../components/styles";

import { View, ActivityIndicator } from "react-native";

//colors
const { brand, darkLight, primary } = Colors;

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

//Api client
import axios from "axios";

//Social Network
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";

//Endpoints
const postUserAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Utilizators/PostUtilizator";
const getUserByGoogleAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Utilizators/GetUtilizatorByGoogle";
const getUserByFacebookAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Utilizators/GetUtilizatorByFacebook";

//Todo
const Login = ({ navigation, route }) => {
  const [isLoggedIn, setLoggedinStatus] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [facebookSubmitting, setFacebookSubmitting] = useState(false);
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
        console.log("1. Result api call HandleGoogleSignIN : " + type);
        if (type == "success") {
          const { email, name } = user;
          //Daca user-ul este in Baza de date, se trece peste formular
          let isEmailRegistered = await setUserRegisteredGoogle(email, name);
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
  //ToDo -- schimba functia intr-una generica
  // (adauga parametru de tip -- facebook/google/ios ca sa stii de unde vine)
  const setUserRegisteredGoogle = async (email, name) => {
    console.log("2. isUserRegistered" + email);

    try {
      const resp = await axios.get(getUserByGoogleAPI, {
        params: { googleid: email },
      });
      setCurrentUserId(resp);
      console.log(resp.status);
      console.log("Current user id: " + currentUserId);
      console.log("4. SetEmailCreatedTrue: ");
      return true;
    } catch (err) {
      //Daca nu exista contul in db => formular + daca completeaza formularul se intoarce in Login screen
      if (err.toString() == "Error: Request failed with status code 404") {
        console.log("Cont inexistent in db");
        console.log(name);
        // param dupa ce functioneaza si fb
        showQuestionnaireDialog("google", email);
        //postNewUser(email, name);
      } else {
        console.log("4. SetEmailCreatedFalse: " + err);
      }
    }
    return false;
  };

  async function handleFacebookSignIn() {
    setFacebookSubmitting(true);
    try {
      await Facebook.initializeAsync({
        appId: "948340382494053",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile", "email"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=name,email`
        );
        console.log("Facebook respo: ");

        const { email, name } = await response.json();

        let isEmailRegistered = await setUserRegisteredFacebook(email, name);
        console.log("isEmailRegistered: " + isEmailRegistered);
        if (isEmailRegistered) {
          persistLogin({ email, name, currentUserId }, message, "SUCCESS");
        } else {
          console.log(
            "6. Pentru a putea accesa contul va trebui sa completati un scurt formular."
          );
          setFacebookSubmitting(false);
          //Todo
          //useFormular();
        }
      } else {
        // type === 'cancel'
        setFacebookSubmitting(false);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      setFacebookSubmitting(false);
    }
  }

  const setUserRegisteredFacebook = async (email, name) => {
    console.log("2. isUserRegistered" + email);

    try {
      const resp = await axios.get(getUserByFacebookAPI, {
        params: { facebookid: email },
      });
      setCurrentUserId(resp);
      console.log(resp.status);
      console.log("Current user id: " + currentUserId);
      console.log("4. SetEmailCreatedTrue: ");
      return true;
    } catch (err) {
      //Daca nu exista contul in db => formular + daca completeaza formularul se intoarce in Login screen
      if (err.toString() == "Error: Request failed with status code 404") {
        console.log("Cont inexistent in db");
        console.log(name);
        // param dupa ce functioneaza si fb
        showQuestionnaireDialog("facebook", email);
        //postNewUser(email, name);
      } else {
        console.log("4. SetEmailCreatedFalse: " + err);
      }
    }
    return false;
  };

  const postNewUser = async (email, name) => {
    try {
      const resp = await axios.post(postUserAPI, {
        userLoginGoogle: email,
        userLoginIOS: "",
        userEmail: "",
        userLoginFacebook: "",
        ID_Utilizator: 1,
        ProfilUtilizator: "",
      });
      console.log(resp.data.ID_Utilizator);
      setCurrentUserId(resp);
      console.log(currentUserId);
      console.log(
        "New user id: " +
          resp.data.ID_Utilizator.toString() +
          "CurrentuserID" +
          currentUserId
      );
      persistLogin({ email, name, currentUserId }, message, "SUCCESS");
    } catch (err) {
      console.log("Post new user: " + err);
    }
  };

  const showQuestionnaireDialog = (loginPlatform, email) => {
    return Alert.alert(
      "Cont nou / New account", //Cont nou
      "Pentru crearea contului trebuie sa completati un formular. Selectati limba dorita./ Account registration requires completing a short questionnaire. Select the language.",
      [
        // The "Yes" button
        {
          text: "RO",
          onPress: () => {
            navigation.navigate("Questionnaire", {
              loginType: loginPlatform,
              language: "RO",
              email: email,
            });
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "EN",
          onPress: () => {
            navigation.navigate("Questionnaire", {
              loginType: loginPlatform,
              language: "EN",
              email: email,
            });
          },
        },
      ]
    );
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

          {!facebookSubmitting && (
            <StyledButton facebook={true} onPress={handleFacebookSignIn}>
              <Fontisto name="facebook" color={"white"} size={25} />
              <ButtonText> Login prin Facebook</ButtonText>
            </StyledButton>
          )}
          {facebookSubmitting && (
            <StyledButton facebook={true} disabled={true}>
              <ActivityIndicator size="large" color={primary} />
            </StyledButton>
          )}
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
