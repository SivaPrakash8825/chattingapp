import * as React from "react";
import Icon from "react-native-vector-icons/Ionicons";

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
          paddingTop: 10,
          height: 60,
          width: "90%",
          left: 20,

          borderRadius: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabel: "",
          // tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ focused }) => (
            <Icon name="home" color={focused ? "green" : "black"} size={30} />
          ),
        }}
        component={Home}></Tab.Screen>
      <Tab.Screen
        name="UserList"
        options={{
          tabBarLabel: "",
          // tabBarLabelPosition: "beside-icon",

          tabBarIcon: ({ focused }) => (
            <Icon
              name="people-circle-outline"
              color={focused ? "green" : "black"}
              size={35}
            />
          ),
        }}
        component={UserList}></Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: "",
          // tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="person-sharp"
              color={focused ? "green" : "black"}
              size={30}
            />
          ),
          tabBarActiveTintColor: "red",
        }}
        name="Profile"
        component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default BottomNav;
