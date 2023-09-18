import React from "react";
import { TextInput, Button } from "react-native";
import { View } from "react-native";

const Register = ({ navigation }) => {
  return (
    <View className="w-screen h-screen justify-center items-center">
      <View className="w-[80%] h-[40%] bg-black">
        <TextInput placeholder="enter the username"></TextInput>
        <TextInput placeholder="enter the new password"></TextInput>
        <TextInput placeholder="enter the confirm password"></TextInput>
        <Button title="regis"></Button>
        <Button
          title="back"
          onPress={() => navigation.navigate("Login")}></Button>
      </View>
    </View>
  );
};

export default Register;
