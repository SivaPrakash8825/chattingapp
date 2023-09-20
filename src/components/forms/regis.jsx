import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { TextInput, Button, Text } from "react-native";
import { View } from "react-native";
import { GetAuth, GetFirebase, app } from "../../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ navigation }) => {
  const [emailPass, setEmailPass] = useState({
    email: "",
    password: "",
    conPassword: "",
  });
  const auth = GetAuth;
  const Register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailPass.email,
        emailPass.password
      );
      console.log("adsf");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <View className="w-screen h-screen justify-center items-center">
      <View className="w-[80%] h-[40%] bg-">
        <TextInput
          value={emailPass.email}
          onChangeText={(e) => {
            setEmailPass((val) => ({ ...val, email: e }));
          }}
          autoCapitalize="none"
          placeholder="enter the username"></TextInput>
        <TextInput
          value={emailPass.password}
          secureTextEntry={true}
          onChangeText={(e) => {
            setEmailPass((val) => ({ ...val, password: e }));
          }}
          placeholder="enter the new password"></TextInput>
        <TextInput
          value={emailPass.conPassword}
          onChangeText={(e) => {
            setEmailPass((val) => ({ ...val, conPassword: e }));
          }}
          placeholder="enter the confirm password"></TextInput>
        <Button title="regis" onPress={Register}></Button>
        <Button
          title="back"
          onPress={() => navigation.navigate("Login")}></Button>
      </View>
    </View>
  );
};

export default Register;
