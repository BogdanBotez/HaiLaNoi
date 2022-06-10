import React, {
  useState,
  useContext,
  useEffect,
  Component,
  useRef,
} from "react";

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  setState,
} from "react-native";

import axios from "axios";

const getTransactionsByUserIDAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Tranzacties/TranzactiiListByUtilizator";

const getRatingsByEntityUserAPI =
  "http://cm2020.unitbv.ro/Turism4/api/RatingUtilizatorEntities/RatingUtilizatorEntityListByEntityUtilizator";

const getTransactionsByEntityUserAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Tranzacties/TranzactiiTopListByEntitateUtilizator";

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "native-base";
import { InnerContainer, StyledContainer } from "../components/styles";

const Transactions = ({ navigation, route }) => {
  const [transactions, setTransactions] = useState("");
  const [reviewsNumberByEntity, setReviewsNumberByEntity] = useState(null);
  const [transactionsNumberByEntity, setTransactionsNumberByEntity] =
    useState(null);

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email, currentUserId } = storedCredentials;
  const TRANSACTIONS = useRef(null);
  const REVIEWS = useRef(null);

  const firstRenderRef = useRef(false);

  useEffect(() => {
    getAllTransactionsByUserID();
  });

  const getAllTransactionsByUserID = async () => {
    try {
      const resp = await axios.get(getTransactionsByUserIDAPI, {
        params: { ID_Utilizator: currentUserId },
      });
      setTransactions(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const setNumberOfReviewsByUserForEntity = async (entityID) => {
    try {
      const resp = await axios.get(getRatingsByEntityUserAPI, {
        params: {
          ID_ENTITY: entityID,
          ID_Utilizator: currentUserId,
          NrInregDeReturnat: transactions.length,
        },
      });
      REVIEWS.current = resp.data.length;
      console.log(
        "Numar de review-uri pentru entitatea selectata: " + resp.data.length
      );
    } catch (err) {
      console.log(err);
    }
  };

  const setNumberOfTransactionsByUserForEntity = async (entityID) => {
    try {
      const resp = await axios.get(getTransactionsByEntityUserAPI, {
        params: {
          id_ENTITY: entityID,
          id_utilizator: currentUserId,
          nrTranzactii: transactions.length,
        },
      });

      TRANSACTIONS.current = resp.data.length;
      // console.log("Transactions" + TRANSACTIONS.current);
      // setTransactionsNumberByEntity(resp.data.length);
      // console.log("Numar de tranzactii: " + resp.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getDateSubstring = (fullDate) => {
    var date = fullDate.substring(0, 10);
    return date;
  };

  const getTimeSubstring = (fullDate) => {
    var date = fullDate.substring(11, 16);
    return date;
  };

  const pressHandler = async (entityName, entityID) => {
    await setNumberOfReviewsByUserForEntity(entityID);
    await setNumberOfTransactionsByUserForEntity(entityID);

    if (TRANSACTIONS.current > REVIEWS.current) {
      showAlert(true, entityName, entityID);
      console.log("Show alert true");
      console.log("transact:" + TRANSACTIONS.current);
      console.log("reviews:" + REVIEWS.current);
    } else {
      showAlert(false, entityName, entityID);
      console.log("Show alert FALSE");
      console.log("transact:" + TRANSACTIONS.current);
      console.log("reviews:" + REVIEWS.current);
    }
  };

  //TODO: termina alertbox-ul => redirectionare cu props daca e true
  const showAlert = (isReviewable, entityName, entityID) => {
    var message = "";
    var title = "";
    if (isReviewable) {
      message =
        "Doresti sa adaugi o recenzie pentru locatia: " + entityName + "?";
      title = "Eligibil pentru recenzie.";
    } else {
      message =
        "Doresti mai multe informatii despre locatia: " + entityName + "?";
      title = "Recenzie adaugata in trecut.";
    }

    return Alert.alert(title, message, [
      // The "Yes" button
      {
        text: "Da",
        onPress: () => {
          if (isReviewable) {
            navigation.navigate("Review", {
              locationID: entityID,
            });
          } else {
            navigation.navigate("EntityInformation", {
              entityID: entityID,
              entityName: entityName,
            });
          }
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "Nu",
      },
    ]);
  };

  return (
    <StyledContainer>
      <View style={styles.container}>
        {transactions ? (
          <FlatList
            itemSeparatorComponent={() => <View style={styles.separator} />}
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => pressHandler(item.ENTITY_NAME, item.ID_ENTITY)}
              >
                <Text style={styles.item}>
                  Locatia: {item.ENTITY_NAME + ", "}
                  Data: {getDateSubstring(item.DataOra.toString())}, Ora:{" "}
                  {getTimeSubstring(item.DataOra.toString())}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#ffffff",
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  },
  item: {
    textAlign: "center",
    marginTop: 20,
    padding: 10,
    marginHorizontal: 0,
    paddingHorizontal: 10,
    backgroundColor: "#f4f0ec",
    fontSize: 14,
    borderRadius: 20,
    borderColor: "#27270c",
    borderWidth: 2,
  },
});

export default Transactions;
