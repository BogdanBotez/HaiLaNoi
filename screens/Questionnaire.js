import React, { useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { Colors } from "../components/styles";
import SurveyDataRO from "../survey data/SurveyDataRO";
import SurveyDataEN from "../survey data/SurveyDataEN";

//Api client
import axios from "axios";
const postUserAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Utilizators/PostUtilizator";

var answersJSON = {};
var allQuestions = {};

const Questionnaire = ({ navigation, route }) => {
  const { loginType, language, email } = route.params;

  if (language == "RO") {
    allQuestions = SurveyDataRO;
  } else {
    allQuestions = SurveyDataEN;
  }
  addLanguageOptionToJSON(language);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const validateAnswer = (selectedOption) => {
    setCurrentOptionSelected(selectedOption);
    if (currentQuestionIndex != allQuestions.length - 1) {
      setShowNextButton(true);
    } else {
      setShowSubmitButton(true);
    }
  };

  function addLanguageOptionToJSON(languageOption) {
    answersJSON.Language = languageOption;
  }

  const handleNext = () => {
    let property = allQuestions[currentQuestionIndex].Property;
    answersJSON[property] = currentOptionSelected;
    console.log(answersJSON);
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      console.log("handle last question");
      setShowNextButton(false);
      setShowSubmitButton(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleSubmit = () => {
    let property = allQuestions[currentQuestionIndex].Property;
    answersJSON[property] = currentOptionSelected;
    //console.log("JSON after last question: ");
    //console.log(answersJSON);

    postNewUser(loginType, email);

    // TODO: API post
  };

  const postNewUser = async (loginType, email) => {
    console.log("loginType: " + loginType);
    //Todo add for facebook
    if (loginType == "google") {
      try {
        const resp = await axios.post(postUserAPI, {
          userLoginGoogle: email,
          userLoginIOS: "",
          userEmail: "",
          userLoginFacebook: "",
          ID_Utilizator: 1,
          ProfilUtilizator: JSON.stringify(answersJSON),
        });
        console.log(resp.data.ID_Utilizator);
        return Alert.alert(
          "Cont creat cu succes!",
          "Contul " +
            "testFirstQuestionnaireUser" +
            " a fost creat cu succes. Puteti sa va autentificati cand doriti.",
          [
            // The "Yes" button
            {
              text: "Ok",
              onPress: () => {
                navigation.navigate("Iesire din cont");
              },
            },
          ]
        );
      } catch (err) {
        console.log("Post new user: " + err);
      }
    }
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginVertical: 40,
        }}
      >
        {/* Question Counter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ fontSize: 18, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            fontSize: 30,
          }}
        >
          {allQuestions[currentQuestionIndex]?.Question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.Answers.value.map((option) => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            key={option}
            style={{
              backgroundColor:
                option == currentOptionSelected
                  ? Colors.brand
                  : option != currentOptionSelected
                  ? Colors.primary
                  : Colors.primary,
              borderWidth:
                allQuestions[currentQuestionIndex]?.Answers.value.length,
              height: 40,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 20,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>Next</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const renderSubmitButton = () => {
    if (showSubmitButton) {
      return (
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 20,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>Submit</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          position: "relative",
        }}
      >
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

        {/* Submit Button */}
        {renderSubmitButton()}

        {/* Score Modal */}
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                {score > allQuestions.length / 2 ? "Congratulations!" : "Oops!"}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  / {allQuestions.length}
                </Text>
              </View>
            </View>
          </View>
        </Modal> */}
      </View>
    </SafeAreaView>
  );
};

export default Questionnaire;
