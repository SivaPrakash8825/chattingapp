import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "./components/messages";
import BottomNav from "./bottomnav";

const Stack = createStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Stack">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Stack"
        component={BottomNav}></Stack.Screen>
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
};

export default StackNav;
