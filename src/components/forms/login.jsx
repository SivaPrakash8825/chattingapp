import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-native";
import { View } from "react-native";

import { GetAuth } from "../../../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const val = await AsyncStorage.getItem("user");
      console.log(val);
      if (val) {
        navigation.navigate("Stack");
      }
    };
    checkUser();
  }, []);
  const checkAuthor = async () => {
    try {
      const val = await signInWithEmailAndPassword(GetAuth, mail, pass);
      AsyncStorage.setItem(
        "user",
        JSON.stringify({ userId: val.user.uid, userMail: val.user.email })
      );

      navigation.navigate("Stack");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <View className="w-screen h-screen justify-center items-center">
      <View className="w-[80%] h-[30%] bg-blue-500">
        <TextInput
          value={mail}
          placeholder="enter the username"
          onChangeText={(e) => {
            setMail(e);
          }}></TextInput>
        <TextInput
          placeholder="enter the password"
          onChangeText={(e) => {
            setPass(e);
          }}></TextInput>

        <Button
          title="Login"
          onPress={() => {
            checkAuthor();
          }}></Button>
        <Button
          title="go register page"
          onPress={() => navigation.navigate("Register")}></Button>
      </View>
    </View>
  );
};

export default Login;
