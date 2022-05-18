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
      value: [
        { label: "Bucuresti", value: "Bucuresti" },
        { label: "Alba", value: "Alba" },
        { label: "Arad", value: "Arad" },
        { label: "Arges", value: "Arges" },
        { label: "Bacau", value: "Bacau" },
        { label: "Bihor", value: "Bihor" },
        { label: "Bistrita - Nasaud", value: "Bistrita - Nasaud" },
        { label: "Botosani", value: "Botosani" },
        { label: "Braila", value: "Braila" },
        { label: "Brasov", value: "Brasov" },
        { label: "Buzau", value: "Buzau" },
        { label: "Calarasi", value: "Calarasi" },
        { label: "Caras - Severin", value: "Caras - Severin" },
        { label: "Cluj", value: "Cluj" },
        { label: "Constanta", value: "Constanta" },
        { label: "Covasna", value: "Covasna" },
        { label: "Dambovita", value: "Dambovita" },
        { label: "Dolj", value: "Dolj" },
        { label: "Galati", value: "Galati" },
        { label: "Giurgiu", value: "Giurgiu" },
        { label: "Gorj", value: "Gorj" },
        { label: "Harghita", value: "Harghita" },
        { label: "Hunedoara", value: "Hunedoara" },
        { label: "Ialomita", value: "Ialomita" },
        { label: "Iasi", value: "Iasi" },
        { label: "Ilfov", value: "Ilfov" },
        { label: "Maramures", value: "Maramures" },
        { label: "Mehedinti", value: "Mehedinti" },
        { label: "Mures", value: "Mures" },
        { label: "Neamt", value: "Neamt" },
        { label: "Olt", value: "Olt" },
        { label: "Prahova", value: "Prahova" },
        { label: "Salaj", value: "Salaj" },
        { label: "Satu Mare", value: "Satu Mare" },
        { label: "Sibiu", value: "Sibiu" },
        { label: "Suceava", value: "Suceava" },
        { label: "Teleorman", value: "Teleorman" },
        { label: "Timis", value: "Timis" },
        { label: "Tulcea", value: "Tulcea" },
        { label: "Valcea", value: "Valcea" },
        { label: "Vaslui", value: "Vaslui" },
        { label: "Vrancea", value: "Vrancea" },
      ],
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
