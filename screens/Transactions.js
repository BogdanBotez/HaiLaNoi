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
} from "react-native";

import axios from "axios";

const getTransactionsByUserIDAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Tranzacties/TranzactiiListByUtilizator";

//async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "native-base";
import { InnerContainer, StyledContainer } from "../components/styles";

const Transactions = ({ navigation, route }) => {
  const [transactions, setTransactions] = useState("");

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

  const getDateSubstring = (fullDate) => {
    var date = fullDate.substring(0, 10);
    return date;
  };

  const getTimeSubstring = (fullDate) => {
    var date = fullDate.substring(11, 16);
    return date;
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
              <Text style={styles.item}>
                Locatia: {item.ENTITY_NAME + ", "}
                Data: {getDateSubstring(item.DataOra.toString())}, Ora:{" "}
                {getTimeSubstring(item.DataOra.toString())}
              </Text>
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
    marginTop: 20,
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFA500",
    fontSize: 15,
  },
});

export default Transactions;
