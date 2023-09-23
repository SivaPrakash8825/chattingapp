import Icon from "react-native-vector-icons/Ionicons";

import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

import { Pressable } from "react-native";
import { ScrollView } from "react-native";
import { Text, TextInput } from "react-native";

import { GetFirebase } from "../../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Messages = ({ navigation, route }) => {
  const [msg, Setmsg] = useState("");
  const [sendId, setSenderId] = useState("");
  const [allMsg, setAllmsg] = useState([]);

  const messageRef = collection(GetFirebase, "Message");

  const getAllData = () => {
    const quer = query(messageRef, orderBy("arrTime"));
    onSnapshot(quer, (snapshot) => {
      let data = [];

      snapshot.docs.length > data.length
        ? snapshot.docs.forEach((doc) => {
            data.push(doc.data());
          })
        : [];
      const len = data.length - 1;

      allMsg.length <= 0
        ? setAllmsg(data)
        : len + 1 < allMsg.length
        ? setAllmsg((e) => [...e, data[len]])
        : [];
    });
  };

  useEffect(() => {
    const getStorageData = async () => {
      const val = JSON.parse(await AsyncStorage.getItem("user"));
      setSenderId({ ...val, receiverId: route.params.receiverId });
    };

    getStorageData();
    getAllData();
  }, []);

  const sendData = async () => {
    const val = await addDoc(messageRef, {
      senderId: sendId.userId,
      senderMail: sendId.userMail,
      msg: msg,
      arrTime: serverTimestamp(),
      receiverMail: sendId.receiverId,
    });
    Setmsg("");
  };
  return (
    <View className="flex-1">
      <View className="w-screen h-[93.3vh] relative pb-14 bg-gray-400">
        <ScrollView>
          <View className="w-screen h-auto  ">
            {allMsg.map((data, id) => {
              return data.senderId == sendId.userId ? (
                <View
                  key={id}
                  className="max-w-[70%] my-3  relative rounded-2xl rounded-tr-none bg-blue-700 self-end py-2 px-6 mr-12">
                  <Text className="w-3 h-3 rotate-45 absolute top-1 bg-blue-700 -right-1 "></Text>
                  <Text className=" text-justify">{data.msg}</Text>
                  <Image
                    className=" w-5 h-5 rounded-full absolute -right-9 top-0"
                    source={require("../.../../../assets/icon.png")}></Image>
                </View>
              ) : (
                <View
                  key={id}
                  className="max-w-[70%] my-3 self-start  rounded-2xl rounded-tl-none bg-blue-700  py-2 px-6 ml-12">
                  <Text className="w-3 h-3 rotate-45 absolute top-1 bg-blue-700 -left-1"></Text>
                  <Text>{data.msg}</Text>
                  <Image
                    className=" w-5 h-5 rounded-full absolute -left-9 top-0"
                    source={require("../.../../../assets/icon.png")}></Image>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View className="absolute  bottom-1 h-12  w-full ">
        <View className="w-full h-full flex-1 gap-x-1 items-center flex-row px-2">
          <TextInput
            value={msg}
            onChangeText={(e) => {
              Setmsg(e);
            }}
            className="bg-white pl-5 rounded-2xl w-[84%] h-full"
            placeholder="Message"></TextInput>

          <Pressable
            onPress={sendData}
            className=" w-12 h-12 bg-green-600 rounded-full justify-center items-center">
            <Icon name="send" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Messages;
