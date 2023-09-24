import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { GetFirebase } from "../../Firebase";

const Profile = ({ navigation }) => {
  const [UserDetails, setUserDetails] = useState([]);
  const userRef = collection(GetFirebase, "userMail");
  useEffect(() => {
    const getData = async () => {
      const val = JSON.parse(await AsyncStorage.getItem("user"));
      const ele = await getDocs(
        query(userRef, where("userMail", "==", val.userMail))
      );
      const arr = [];
      ele.docs.map((data) => {
        arr.push(data.data());
      });
      setUserDetails(arr);
      // console.log(arr);
    };
    getData();
  }, []);
  return (
    <View className=" w-screen h-screen ">
      <View className="w-96 h-96 bg-yellw-400">
        {/* {UserDetails[0] ? <Text>fasdfadsfsdaf</Text> : <Text>fail</Text>} */}
        <Image
          className="w-full h-full"
          source={
            UserDetails[0]
              ? { uri: UserDetails[0].userImage }
              : require("../../assets/icon.png")
          }></Image>
      </View>
      <View>
        <TextInput
          value={UserDetails[0] ? UserDetails[0].userName : ""}
          placeholder="edit name"></TextInput>
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
