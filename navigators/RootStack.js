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
            initialRouteName="Delogare"
          >
            <>
              <Drawer.Screen
                options={{ headerTintColor: brand }}
                name="Acasa"
                component={Welcome}
              />
              <Drawer.Screen
                options={{ headerTintColor: brand }}
                name="Locatii participante"
                text="Loc"
                component={Entities}
              />
              <Drawer.Screen
                //makes drawer invisible
                options={{
                  headerShown: false,
                  swipeEdgeWidth: 0,
                }}
                name="Delogare"
                component={Login}
              />
            </>
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
