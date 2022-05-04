import React, { useState } from "react";
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

const Questionnaire = () => {
  const allQuestions = SurveyDataRO;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer1RO, setAnswer1RO] = useState(null);
  const [answer2RO, setAnswer2RO] = useState(null);
  const [answer3RO, setAnswer3RO] = useState(null);
  const [answer4RO, setAnswer4RO] = useState(null);
  const [answer5RO, setAnswer5RO] = useState(null);
  const [answer1EN, setAnswer1EN] = useState(null);
  const [answer2EN, setAnswer2EN] = useState(null);
  const [answer3EN, setAnswer3EN] = useState(null);
  const [answer4EN, setAnswer4EN] = useState(null);
  const [answer5EN, setAnswer5EN] = useState(null);
  const [currentOptionSelected, setCurrentOptionSelected] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const validateAnswer = (selectedOption) => {
    console.log("first; funct param:" + selectedOption);
    setCurrentOptionSelected(selectedOption);
    console.log(allQuestions.length - 1);

    // if (currentQuestionIndex == allQuestions.length - 1) {
    //   handleSubmit();
    // } else {
    // Show Next Button
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      console.log("handle last question");
      setShowNextButton(false);
      handleSubmit();
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
    setShowSubmitButton(true);
    setShowNextButton(false);
    // TODO: API post
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
          onPress={handleNext}
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
