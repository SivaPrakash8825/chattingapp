import React, { useEffect, useState } from "react";
import {
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  View,
  Image,
} from "react-native";
import Header from "./header/header";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { GetFirebase } from "../../Firebase";

const Home = ({ navigation }) => {
  const [allUser, setAllUser] = useState([]);
  const userRef = collection(GetFirebase, "userMail");
  const siva = async () => {
    const val = JSON.parse(await AsyncStorage.getItem("user"));
    const ele = await getDocs(userRef);
    const arr = [];
    ele.docs.map((data) => {
      // console.log(data.data());
      data.data().friendList.includes(val.userMail) &&
      val.userMail != data.data().userMail
        ? arr.push({ receiverMail: data.data().userMail, ...data.data() })
        : [];
    });
    // console.log(arr);
    setAllUser(arr);
  };
  useEffect(() => {
    onSnapshot(userRef, (snapshot) => {
      siva();
    });
    siva();
  }, []);

  const ContactList = () => {
    return (
      <SafeAreaView>
        <Header />
        <FlatList
          className="w-screen bg-red-600"
          data={allUser}
          renderItem={({ item, index }) => (
            <View key={index} className=" w-full bg-red-200">
              <Pressable
                onPress={() => {
                  navigation.navigate("Messages", {
                    receiverId: item.receiverMail,
                  });
                }}
                className="  px-5 flex-row justify-between items-center w-full py-3 border-b border-black s ">
                <View className="flex-row items-center">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={{ uri: item.userImage }}></Image>
                  <View className="ml-5 ">
                    <Text className="font-bold text-xl">{item.userName}</Text>
                    <Text className=" text-[12px]">{item.receiverMail}</Text>
                  </View>
                </View>
                <View className=" flex-col justify-center items-center gap-y-2">
                  <Text className=" text-[12px] text-green-700">2:30 pm</Text>
                  <Text className="bg-green-700 text-white w-5 rounded-full justify-center items-center text-center">
                    1
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    );
  };
  return <ContactList />;
};

export default Home;
