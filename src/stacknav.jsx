import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "./components/messages";
import BottomNav from "./bottomnav";
import Login from "./components/forms/login";
import Register from "./components/forms/regis";
const Stack = createStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}></Stack.Screen>
      <Stack.Screen
        name="Register"
        options={{ headerShown: false }}
        component={Register}></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Stack"
        component={BottomNav}></Stack.Screen>
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
};

export default StackNav;
