import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import React, { useEffect } from "react";
import { TextInput, Button } from "react-native";
import { View } from "react-native";
import { GetAuth } from "../../../Firebase";
import SyncStorage from "sync-storage";

const Login = ({ navigation }) => {
  // useEffect(())
  // useEffect(() => {
  //   async function siva() {
  //     const val = onAuthStateChanged(GetAuth);
  //     console.log(val);
  //     // const val = await AsyncStorage.setItem("userId", userId);
  //   }
  //   siva();
  // }, []);
  const checkAuthor = async () => {
    try {
      const val = await signInWithEmailAndPassword(
        GetAuth,
        "red@gmail.com",
        "red123"
      );
      SyncStorage.set(
        "user",
        JSON.stringify({ userId: val.user.uid, userMail: val.user.email })
      );

      console.log(val.user.email);
    } catch (e) {
      alert(e);
    }
    // console.log(val);
    // navigation.navigate("UserDetails");
  };
  return (
    <View className="w-screen h-screen justify-center items-center">
      <View className="w-[80%] h-[30%] bg-blue-500">
        <TextInput placeholder="enter the username"></TextInput>
        <TextInput placeholder="enter the password"></TextInput>

        <Button
          title="Login"
          onPress={() => {
            checkAuthor();
          }}></Button>
        <Button
          title="go register page"
          onPress={() => console.log(SyncStorage.get("user"))}></Button>
      </View>
    </View>
  );
};

export default Login;
