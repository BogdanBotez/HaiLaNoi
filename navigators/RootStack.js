import React from "react";

import { Colors } from "./../components/styles";
const { primary, tertiary, brand, black } = Colors;

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

//screens
import Login from "./../screens/Login";
import Welcome from "./../screens/Welcome";
import Entities from "./../screens/Entities";
import Scanner from "../screens/Scanner";
import Discount from "../screens/Discount";
import Transactions from "../screens/Transactions";
import Review from "../screens/Review";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          {/* Todo -- change hamburger icon's color to brand */}
          <Drawer.Navigator
            screenOptions={{
              headerStyled: {
                backgroundColor: tertiary,
              },
              leftButtonIconStyle: { tintColor: black },
              //headerTintColor: tertiary,
              headerTransparent: true,
              headerTitle: "",
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
            initialRouteName="Iesire din cont"
          >
            <>
              <Drawer.Screen
                options={{ headerTintColor: black }}
                name="Acasa"
                component={Welcome}
              />
              <Drawer.Screen
                options={{
                  headerTintColor: black,
                }}
                name="Locatii participante"
                component={Entities}
              />
              <Drawer.Screen
                options={{
                  headerTintColor: black,
                  drawerItemStyle: {
                    display: "none",
                  },
                }}
                name="Scanare"
                component={Scanner}
              />
              <Drawer.Screen
                options={{ headerTintColor: black }}
                name="Istoric utilizator"
                component={Transactions}
              />
              <Drawer.Screen
                //makes drawer invisible
                options={{
                  headerShown: false,
                  swipeEdgeWidth: 0,
                }}
                name="Iesire din cont"
                component={Login}
              />
              <Drawer.Screen
                options={{
                  headerTintColor: black,
                  drawerItemStyle: {
                    display: "none",
                  },
                }}
                name="Discount"
                component={Discount}
              />
              <Drawer.Screen
                options={{
                  headerTintColor: black,
                  drawerItemStyle: {
                    display: "none",
                  },
                }}
                name="Review"
                component={Review}
              />
            </>
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
