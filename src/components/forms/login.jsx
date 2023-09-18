import React from "react";
import { TextInput, Button } from "react-native";
import { View } from "react-native";

const Login = ({ navigation }) => {
  return (
    <View className="w-screen h-screen justify-center items-center">
      <View className="w-[80%] h-[30%] bg-blue-500">
        <TextInput placeholder="enter the username"></TextInput>
        <TextInput placeholder="enter the password"></TextInput>

        <Button
          title="Login"
          onPress={() => {
            navigation.navigate("Stack");
          }}></Button>
        <Button
          title="go register page"
          onPress={() => navigation.navigate("Register")}></Button>
      </View>
    </View>
  );
};

export default Login;
