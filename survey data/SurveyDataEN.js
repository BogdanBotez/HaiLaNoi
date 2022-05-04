export default dataEN = [
  {
    EN1: "Which is your country of origin?",
    Answers: {
      country: "'NextQ' for country in Countries",
    },
    Property: "Country",
  },
  {
    EN2: "What is your age?",
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
    EN3: "What is the purpose of your visit in Brașov?",
    Answers: {
      Business: "NextQ",
      Vacation: "NextQ",
      Other: "NextQ",
    },
    Property: "Motivation",
  },
  {
    EN4: "How many nights will you stay in Brașov?",
    Answers: {
      0: "NextQ",
      1: "NextQ",
      2: "NextQ",
      3: "NextQ",
      4: "NextQ",
      5: "NextQ",
    },
    Property: "NightsSpent",
  },
  {
    EN5: "How often do you dine out?",
    Answers: {
      Never: "Submit",
      "Once a month": "Submit",
      "Once e week": "Submit",
      Daily: "Submit",
    },
    Property: "FrequnecyOfDiningOut",
  },
];
