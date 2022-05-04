import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import axios from "axios";

const getEntityByIdAPI =
  "http://cm2020.unitbv.ro/Turism4/api/Entities/GetEntity";

const Scanner = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  let locationName = "null";

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    let isLocationRegistered = await verifyLocationRegistered(data);
    console.log("isLocationRegistered: " + isLocationRegistered);
    if (isLocationRegistered) {
      showConfirmDialog(data);
    } else {
      alert("Codul scanat nu apartine unei locatii partenere");
    }
  };

  const showConfirmDialog = (data) => {
    return Alert.alert(
      "Scanare reusita!",
      "Esti sigur ca vrei sa primesti discount pentru urmatoarea locatie: " +
        locationName,
      [
        // The "Yes" button
        {
          text: "Da",
          onPress: () => {
            navigation.navigate("Discount", {
              locationID: data,
              locationName: locationName,
            });
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Nu",
        },
      ]
    );
  };
  // <View style={styles.container}>
  //   <FlatList
  //     itemSeparatorComponent={() => <View style={styles.separator} />}
  //     data={transactions}
  //     keyExtractor={(item, index) => index.toString()}
  //     renderItem={
  //       ({ item }) => (
  //         <Text style={styles.item}>
  //           Locatia: {item.ENTITY_NAME + ", "}
  //           Data: {getDateSubstring(item.DataOra.toString())}, Ora:{" "}
  //           {getTimeSubstring(item.DataOra.toString())}
  //         </Text>
  //       )
  //       // return (
  //       //   <ListItem
  //       //     title={item.ENTITY_NAME}
  //       //     //title={"${item.ENTITY_NAME} (${item.RatingCurent})"}
  //       //     // onPress={() => {}}
  //       //   />
  //       // );
  //     }
  //   />
  // </View>

  const verifyLocationRegistered = async (qrData) => {
    locationName = "";
    try {
      const resp = await axios.get(getEntityByIdAPI, {
        params: { id: qrData },
      });
      console.log(getEntityByIdAPI + "/" + qrData);
      console.log(resp.data);
      setLocationName(resp.data.ENTITY_NAME);
      return true;
    } catch (err) {
      console.log("Get entity by ID API error: " + err);
      return false;
    }
  };

  const setLocationName = (data) => {
    locationName = data;
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={"Apasa pentru o noua scanare"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default Scanner;
// const askForCameraPermission = () => {
//   (async () => {
//     const { status } = await BarCodeScanner.requestPermissionsAsync();
//     setHasPermission(status === "granted");
//   })();
// };

// //Request Camera Permission
// useEffect(() => {
//   askForCameraPermission();
// }, []);

// const handleBarCodeScanned = (data) => {
//   setScanned(true);
//   setText(data);
//   console.log("Data: " + data);
// };

// //Check permission and return the screens
// if (hasPermission === null) {
//   return (
//     <View>
//       <Text>Requesting for camera permission</Text>
//     </View>
//   );
// }

// if (hasPermission === false) {
//   return (
//     <View style={styles.container}>
//       <Text style={{ margin: 10 }}>No access to camera</Text>
//       <StyledButton
//         title={"Allow Camera"}
//         onPress={() => askForCameraPermission()}
//       />
//     </View>
//   );
// }
