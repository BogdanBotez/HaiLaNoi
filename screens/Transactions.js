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

  const firstRenderRef = useRef(false);

  useEffect(() => {
    getAllTransactionsByUserID();
  }); // am incercat si cu [transactions] dar intra (cum e de asteptat)  in loop infinit

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
      setReviewsNumberByEntity(resp.data.length);
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
      setTransactionsNumberByEntity(resp.data.length);
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

  const pressHandler = (entityName, entityID) => {
    setNumberOfReviewsByUserForEntity(entityID);
    setNumberOfTransactionsByUserForEntity(entityID);

    if (transactionsNumberByEntity > reviewsNumberByEntity) {
      showAlert(true, entityName, entityID);
    } else {
      showAlert(false, entityName, entityID);
    }
  };

  //TODO: termina alertbox-ul => redirectionare cu props daca e true
  const showAlert = (isReviewable, entityName, entityID) => {
    var message = "";
    var title = "";
    if (isReviewable) {
      message = "Doresti sa adaugi o recenzie pentru ${entityName} ?";
      title = "Eligibil pentru recenzie.";
    } else {
      message = "Doresti mai multe informatii despre ${entityName} ?";
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
