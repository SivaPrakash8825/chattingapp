import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import UserList from "./components/userList";
import Profile from "./components/profile";

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
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}></Tab.Screen>
      <Tab.Screen name="UserList" component={UserList}></Tab.Screen>
      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default BottomNav;
