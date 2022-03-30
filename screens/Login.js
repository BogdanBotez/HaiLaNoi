import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

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

const justTestApi = () => {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const changeUserIdHandler = () => {
    setUserId((userId) => (userId === 3 ? 1 : userId + 1));
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    const url =
      "http://cm2020.unitbv.ro/Turism4/api/Utilizators/GetUtilizatorByEmail?email=icm76@yahoo.com";
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Data fetching cancelled");
        } else {
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchUsers();
    console.log(user);
    return () => source.cancel("Data fetching cancelled");
  }, [userId]);
};
//Todo
const Login = ({ navigation, route }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const [isEmailCreated, setEmailCreated] = useState(null);

  const testApi = () => {
    setEmailCreated(false);
    let response = axios
      .get(
        "http://cm2020.unitbv.ro/Turism4/api/Utilizators/GetUtilizatorByEmail?email=icm76@yahoo.com"
      )
      .then((response) => {
        setEmailCreated(true);
        console.log("2. SetEmailCreatedTrue");
      });
    console.log("3. SetEmailCreatedTrue");
  };

  const testApi2 = async () => {
    setEmailCreated(false);
    let response = await axios.get(
      "http://cm2020.unitbv.ro/Turism4/api/Utilizators/GetUtilizatorByEmail?email=icm76@yahoo.com"
    );
    console.log("api 2:" + JSON.stringify(response));
    {
      setEmailCreated(true);
      console.log("api 2 : 3. SetEmailCreatedTrue");
      console.log("api 2 : 4" + isEmailCreated);
    }
  };

  const signInAsync = async () => {
    setGoogleSubmitting(true);
    console.log("1. LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId:
          "996685081623-ffajq1bahiqmv0ficftrt7qoc4o4h310.apps.googleusercontent.com",
        androidClientId:
          "996685081623-fh0qs1n2h7r4c1hfec55pvik8o0gmbq3.apps.googleusercontent.com",
      });

      if (type === "success") {
        const { email, name } = user;

        await setUserRegistered(email);
        if (isEmailCreated === true) {
          persistLogin({ email, name }, message, "SUCCESS");
        } else {
          console.log(
            "6. Pentru a putea accesa contul va trebui sa completati un scurt formular."
          );
          setGoogleSubmitting(false);
          //ToDo
          //useFormular();
        }
      } else {
        handleMessage(
          "Ne pare rau, autentificarea prin contul Google nu a reusit."
        );
      }
      setGoogleSubmitting(false);
    } catch (error) {
      console.log(error);
      handleMessage(
        "Eroare! Va rugam verificati conexiunea la internet si reincercati."
      );
      setGoogleSubmitting(false);
    }
  };

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
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
      .then((result) => {
        const { type, user } = result;
        console.log(
          "1. Data from api call HandleGoogleSignIN : " + result.data
        );
        if (type == "success") {
          const { email, name } = user;
          //Daca user-ul este in Baza de date, se trece peste formular
          //testApi();
          testApi2();
          //setUserRegistered(email);
          if (isEmailCreated === true) {
            persistLogin({ email, name }, message, "SUCCESS");
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
  const setUserRegistered = async (currentUserEmail) => {
    console.log("2. isUserRegistered" + currentUserEmail);
    //setEmailCreated(false);
    console.log("3. " + currentUserEmail);
    setEmailCreated(false);
    try {
      const resp = await axios.get(
        "http://cm2020.unitbv.ro/Turism4/api/Utilizators/GetUtilizatorByEmail",
        { params: { email: currentUserEmail } }
      );
      //alert(resp.data);
      setEmailCreated(true);
      console.log("4. SetEmailCreatedTrue");
    } catch (err) {
      //alert(err);
      setEmailCreated(false);
      console.log("4. SetEmailCreatedFalse");
    }
    console.log("5. emailCreated: ", isEmailCreated);
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem("currentUserCredentials", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage("Persisting login failed");
      });
  };

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

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == "" || values.password == "") {
                handleMessage("Toate campurile sunt obligatorii");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Adresa de email"
                  icon="mail"
                  placeholder="bogdan@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Parola"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}> {message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={setUserRegistered}>
                    <ButtonText>Autentificare</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

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
                <StyledButton facebook={true} onPress={signInAsync}>
                  <Fontisto name="facebook" color={"white"} size={25} />
                  <ButtonText> Login prin Facebook</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Nu aveti un cont? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent color="blue">Creati unul!</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
