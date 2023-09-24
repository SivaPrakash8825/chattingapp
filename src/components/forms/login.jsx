import { signInWithEmailAndPassword } from "firebase/auth";

import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-native";
import { View } from "react-native";

import { GetAuth, GetFirebase } from "../../../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, where, getDocs } from "firebase/firestore";
// import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const userRef = collection(GetFirebase, "userMail");
  useEffect(() => {
    const checkUser = async () => {
      const val = await AsyncStorage.getItem("user");

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
      const ques = query(userRef, where("userMail", "==", mail));
      const ele = await getDocs(ques);
      const data = [];
      ele.docs.map((val) => {
        data.push(val);
      });

      data.length <= 0
        ? navigation.navigate("UserDetails")
        : navigation.navigate("Stack");
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
