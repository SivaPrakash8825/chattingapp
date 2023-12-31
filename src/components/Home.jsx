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
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { GetFirebase } from "../../Firebase";

const Home = ({ navigation }) => {
  const [allUser, setAllUser] = useState([]);

  const userNameRef = collection(GetFirebase, "userMail");

  const siva = async () => {
    const val = JSON.parse(await AsyncStorage.getItem("user"));
    const friendRef = collection(
      GetFirebase,
      `requestList/user/${val.userMail}`
    );
    const ques = query(userNameRef, where("userMail", "==", val.userMail));
    const ele2 = await getDocs(ques);
    const allFriends = await getDocs(
      query(friendRef, orderBy("arrTime", "desc"))
    );
    const data = [];
    const FriendsData = [];
    ele2.docs.map((val) => {
      // console.log(val.data());
      data.push({
        userName: val.data().userName,
        userImage: val.data().userImage,
      });
    });
    allFriends.docs.map((val) => {
      // console.log(val.data())
      const date = new Date(
        val.data().arrTime.seconds * 1000 +
          val.data().arrTime.nanoseconds / 1000000
      );

      // Format the date as a string (you can adjust the format as needed)
      const formattedDate = date.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      // console.log(val.data());
      val.data().requestAccepted
        ? FriendsData.push({ ...val.data(), msgDate: formattedDate })
        : null;
    });

    // console.log(FriendsData);
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        ...val,
        userName: data[0].userName,
        userImage: data[0].userImage,
      })
    );

    // const userRef = collection(GetFirebase, `user/chat/${val.userMail}`);
    // const ele = await getDocs(query(userRef, orderBy("arrTime", "desc")));
    // const arr = [];
    // ele.docs.map((data) => {
    //   // console.log(data.data());

    //   data.data().senderMail == val.userMail ? arr.push(data.data()) : [];
    // });
    // console.log(arr);
    // console.log(FriendsData);
    setAllUser(FriendsData);
  };
  useEffect(() => {
    const setVal = async () => {
      const val = JSON.parse(await AsyncStorage.getItem("user"));

      const userRef = collection(
        GetFirebase,
        `requestList/user/${val.userMail}`
      );
      onSnapshot(userRef, (snapshot) => {
        // console.log("Asdf");
        siva();
      });
    };
    setVal();
    siva();
  }, []);

  const ContactList = () => {
    return (
      <SafeAreaView>
        <Header />
        <FlatList
          className="w-screen "
          data={allUser}
          renderItem={({ item, index }) => (
            <View key={index} className=" w-full bg-gray-300">
              <Pressable
                onPress={() => {
                  navigation.navigate("Messages", {
                    receiverId: item.senderMail,
                    friendName: item.friendName,
                    userImage: item.receiverImage,
                  });
                }}
                className="  px-5 flex-row justify-between items-center w-full py-3 border-b border-black s ">
                <View className="flex-row items-center">
                  <View className="w-10 h-10  rounded-full border overflow-hidden">
                    <Image
                      className="w-full h-full"
                      source={{ uri: item.receiverImage }}></Image>
                  </View>
                  <View className="ml-5 ">
                    <Text className="font-bold text-xl">{item.friendName}</Text>
                    <Text className=" text-[12px]">
                      {item.msg == null ? "Let's chat with him" : item.msg}
                    </Text>
                  </View>
                </View>
                <View className=" flex-col justify-center items-center gap-y-2">
                  <Text
                    className={` text-[12px] ${
                      item.newMsgCount > 0 ? "text-green-700" : "text-black"
                    } `}>
                    {item.msgDate == null ? "" : item.msgDate}
                  </Text>
                  {item.newMsgCount > 0 ? (
                    <Text className="bg-green-700 text-white w-5 rounded-full justify-center text-[10px] items-center text-center">
                      {item.newMsgCount}
                    </Text>
                  ) : (
                    ""
                  )}
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
