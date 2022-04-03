import React from "react";

import { Colors } from "./../components/styles";
const { primary, tertiary, brand } = Colors;

//React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

//screens
import Login from "./../screens/Login";
import Welcome from "./../screens/Welcome";
import Entities from "./../screens/Entities";

//credentials context
import { CredentialsContext } from "../components/CredentialsContext";
import Scanner from "../screens/Scanner";
import Discount from "../screens/Discount";

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
              leftButtonIconStyle: { tintColor: brand },
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
                options={{ headerTintColor: brand }}
                name="Acasa"
                component={Welcome}
              />
              <Drawer.Screen
                options={{
                  headerTintColor: brand,
                }}
                name="Locatii participante"
                component={Entities}
              />
              <Drawer.Screen
                options={{ headerTintColor: brand }}
                name="Scanare"
                component={Scanner}
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
                  headerTintColor: brand,
                  drawerItemStyle: {
                    display: "none",
                  },
                }}
                name="Discount"
                component={Discount}
              />
            </>
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
