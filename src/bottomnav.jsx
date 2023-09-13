import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Chat from "./components/chat";

const Tab = createBottomTabNavigator();
function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          height: 60,
          width: "90%",
          left: 20,
          borderRadius: 10,
        },
      }}>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Chat" component={Chat}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default BottomNav;
