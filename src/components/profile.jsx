import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Button, TouchableOpacity } from "react-native";
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
    <View className=" w-screen h-screen flex mt-10 items-center ">
      <View className="w-52 h-52 rounded-full border overflow-hidden bg-yellw-400">
        {/* {UserDetails[0] ? <Text>fasdfadsfsdaf</Text> : <Text>fail</Text>} */}
        <Image
          className="w-full h-full "
          source={
            UserDetails[0]
              ? { uri: UserDetails[0].userImage }
              : require("../../assets/icon.png")
          }></Image>
      </View>
      <View className="mt-6 flex items-center">
        <Text>Name : {UserDetails[0] ? UserDetails[0].userName : ""}</Text>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("user");
            navigation.navigate("Login");
          }}>
          <View className="bg-red-500 rounded-lg mt-2 text-center px-10 py-2 flex justify-center items-center ">
            <Icon name="arrow-undo-circle" color="black" size={20} />
            <Text className="font-bold text-[20px] capitalize">logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
