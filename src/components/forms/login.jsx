// import { LinearGradient } from "expo-linear-gradient";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, Image } from "react-native";
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
      <View className="w-full h-1/2 absolute -top-40 z-10">
        <Image
          className="w-full h-full rounded-br-[120px] rounded-bl-[120px] "
          source={require("../../../assets/login.jpg")}></Image>
      </View>
      <View className="w-[100%] h-[110%] px-5 py-20 gap-y-2 justify-center items-center rounded-lg mt-14 bg-fuchsia-700">
        <TextInput
          className="w-[90%] bg-white rounded-xl border px-5 py-3"
          value={mail}
          placeholder="E-Mail"
          onChangeText={(e) => {
            setMail(e);
          }}></TextInput>
        <TextInput
          className="w-[90%] mb-7 bg-white rounded-xl border px-5 py-3"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(e) => {
            setPass(e);
          }}></TextInput>

        <TouchableOpacity
          className="w-[90%] justify-center items-center  py-5 rounded-full bg-purple-700"
          onPress={() => {
            checkAuthor();
          }}>
          <Text className="text-white font-bold ">Login</Text>
        </TouchableOpacity>

        {/* <LinearGradient
          // Button Linear Gradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}>
          <Text>Sign in with Facebook</Text>
        </LinearGradient> */}
        <TouchableOpacity
          className="w-[90%] justify-center items-center py-5 rounded-full bg-white"
          onPress={() => navigation.navigate("Register")}>
          <Text className="text-purple-700 font-bold ">Register</Text>
        </TouchableOpacity>
        {/* <Button
          title="go register page"
          onPress={() => {
            promptAsync();
          }}></Button> */}
      </View>
    </View>
  );
};

export default Login;
