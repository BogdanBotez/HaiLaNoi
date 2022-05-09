export default dataRO = [
  // {
  //   Question:
  //     "Te rugăm să alegi limba pe care vrei să o folosești / Please select your language",
  //   Answers: { Ro: "Section2", En: "Section7" },
  //   Property: "Language",
  // },
  {
    Question: "În ce județ locuiești?",
    Answers: {
      value: ["Brasov", "Timisoara", "Constanta"],
    },
    Property: "County",
  },
  {
    Question: "Care este vârsta ta?",
    Answers: {
      value: [
        "Sub 19 ani",
        "19 - 25 ani",
        "25 - 40 ani",
        "40 - 65 ani",
        "Peste 65 ani",
      ],
    },
    Property: "AgeGroup",
  },
  {
    Question: "Care este scopul vizitei tale în Brașov?",
    Answers: {
      value: ["Afaceri", "Vacanță", "Altceva"],
    },
    Property: "Motivation",
  },
  {
    Question: "Câte nopți petreci în Brașov?",
    Answers: {
      value: ["0", "1", "2", "3", "4", "5"],
    },
    Property: "NightsSpent",
  },
  {
    Question: "Cât de des iei masa în oraș?",
    Answers: {
      value: [
        "Niciodata",
        "O dată pe lună",
        "O dată pe săptămână",
        "In fiecare zi",
      ],
    },
    Property: "FrequnecyOfDiningOut",
  },
];

// "{\"Language\": \"Ro\", \"County\": \"Sălaj\", \"AgeGroup\": \"Sub 19 ani\", \"Motivation\": \"Vacanță\", \"NightsSpent\": 2}"
