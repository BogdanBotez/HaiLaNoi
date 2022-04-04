export default data = [
  {
    Question:
      "Te rugăm să alegi limba pe care vrei să o folosești / Please select your language",
    Answers: { Ro: "Section2", En: "Section7" },
    Property: "Language",
  },
  {
    Question: "În ce județ locuiești?",
    Answers: {
      judet: "'Section4' for judet in JudeteRo",
    },
    Property: "County",
  },
  {
    Question: "Which county do you live in?",
    Answers: {
      judet: "'Section8' for judet in JudeteRo",
    },
    Property: "County",
  },
  {
    Question: "Care este vârsta ta?",
    Answers: {
      "Sub 19 ani": "NextQ",
      "19 - 25 ani": "NextQ",
      "25 - 40 ani": "NextQ",
      "40 - 65 ani": "NextQ",
      "Peste 65 ani": "NextQ",
    },
    Property: "AgeGroup",
  },
  {
    Question: "Care este scopul vizitei tale în Brașov?",
    Answers: {
      Afaceri: "NextQ",
      Vacanță: "NextQ",
      Altceva: "NextQ",
    },
    Property: "Motivation",
  },
  {
    Question: "Câte nopți petreci în Brașov?",
    Answers: {
      0: "Submit",
      1: "Submit",
      2: "Submit",
      3: "Submit",
      4: "Submit",
      5: "Submit",
    },
    Property: "NightsSpent",
  },

  {
    Question: "Care este vârsta ta?",
    Answers: {
      "Sub 19 ani": "NextQ",
      "19 - 25 ani": "NextQ",
      "25 - 40 ani": "NextQ",
      "40 - 65 ani": "NextQ",
      "Peste 65 ani": "NextQ",
    },
    Property: "AgeGroup",
  },
  {
    Question: "Care este scopul vizitei tale în Brașov?",
    Answers: {
      Afaceri: "NextQ",
      Vacanță: "NextQ",
      Altceva: "NextQ",
    },
    Property: "Motivation",
  },
  {
    Question: "Cât de des iei masa în oraș?",
    Answers: {
      "Nu obișnuiesc să iau masa în oraș": "Submit",
      "O dată pe lună": "Submit",
      "O dată pe săptămână": "Submit",
      Zilnic: "Submit",
    },
    Property: "FrequnecyOfDiningOut",
  },
  {
    Question: "What is your age?",
    Answers: {
      "Under 19 years old": "NextQ",
      "19 - 25 years old": "NextQ",
      "25 - 40 years old": "NextQ",
      "40 - 65 years old": "NextQ",
      "Over 65 years old": "NextQ",
    },
    Property: "AgeGroup",
  },
  {
    Question: "How often do you dine out?",
    Answers: {
      Never: "Submit",
      "Once a month": "Submit",
      "Once e week": "Submit",
      Daily: "Submit",
    },
    Property: "FrequnecyOfDiningOut",
  },
  {
    Question: "Which is your country of origin?",
    Answers: {
      country: "'NextQ' for country in Countries",
    },
    Property: "Country",
  },
  {
    Question: "What is your age?",
    Answers: {
      "Under 19 years old": "NextQ",
      "19 - 25 years old": "NextQ",
      "25 - 40 years old": "NextQ",
      "40 - 65 years old": "NextQ",
      "Over 65 years old": "NextQ",
    },
    Property: "AgeGroup",
  },
  {
    Question: "What is the purpose of your visit in Brașov?",
    Answers: {
      Business: "NextQ",
      Vacation: "NextQ",
      Other: "NextQ",
    },
    Property: "Motivation",
  },
  {
    Question: "How many nights will you stay in Brașov?",
    Answers: {
      0: "Submit",
      1: "Submit",
      2: "Submit",
      3: "Submit",
      4: "Submit",
      5: "Submit",
    },
    Property: "NightsSpent",
  },
];
