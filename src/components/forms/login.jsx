import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-native";
import { View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as webBrowser from "expo-web-browser";
import { GetAuth, GetFirebase } from "../../../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, where, getDocs } from "firebase/firestore";
// import AsyncStorage from "@react-native-community/async-storage";

webBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      androidClientId:
        "301139015174-phh2bkcr9p35cv2ue31pen0rfj1jts88.apps.googleusercontent.com",
    },
    {
      native: "com.sivaprakash8825.chattingapp2",
    }
  );
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

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(GetAuth, credential);
    }
  }, [response]);
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(GetAuth, async (user) => {
  //     if (user) {
  //       console.log(JSON.parse(user, null, 2));
  //     } else {
  //       console.log("else");
  //     }
  //   });
  //   return () => unsub();
  // }, []);
  const logWithGoogle = async () => {};

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
          secureTextEntry={true}
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
        <Button
          title="go register page"
          onPress={() => {
            promptAsync();
          }}></Button>
      </View>
    </View>
  );
};

export default Login;
