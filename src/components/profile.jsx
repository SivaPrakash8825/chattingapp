import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Profile = ({ navigation }) => {
  return (
    <View className=" w-screen h-screen ">
      <View className="w-96 h-96 bg-yellw-400">
        <Image
          className="w-full h-full"
          source={require("../../assets/adaptive-icon.png")}></Image>
      </View>
      <View>
        <TextInput placeholder="edit name"></TextInput>
        <Button
          title="logout"
          onPress={() => {
            AsyncStorage.removeItem("user");
            navigation.navigate("Login");
          }}></Button>
      </View>
    </View>
  );
};

export default Profile;
