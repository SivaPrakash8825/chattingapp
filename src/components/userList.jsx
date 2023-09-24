import React, { useEffect, useState } from "react";
import {
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { GetFirebase } from "../../Firebase";

const UserList = ({ navigation }) => {
  const [allUser, setAllUser] = useState([]);
  const [curUser, setCurUser] = useState("");
  const userRef = collection(GetFirebase, "userMail");
  // const Friend = collection(GetFirebase, "friendList");
  const siva = async () => {
    const val = JSON.parse(await AsyncStorage.getItem("user"));
    setCurUser(val);
    const ele = await getDocs(userRef);
    const arr = [];

    ele.docs.map((data) => {
      !data.data().friendList.includes(val.userMail) &&
      val.userMail != data.data().userMail
        ? arr.push({ id: data.id, ...data.data() })
        : [];
    });

    setAllUser(arr);
  };
  useEffect(() => {
    const setData = async () => {
      siva();
    };
    setData();
  }, []);

  const addFriend = async (id, friends, userName) => {
    friends.push(curUser.userMail);

    const val = await updateDoc(doc(GetFirebase, "userMail", id), {
      friendList: friends,
    });
    siva();
  };

  const ContactList = () => {
    return (
      <SafeAreaView>
        {/* <Header /> */}
        <FlatList
          className="w-screen bg-red-600"
          data={allUser}
          renderItem={({ item, index }) => (
            <View key={index} className=" w-full bg-red-200">
              <Pressable
                onPress={() => {
                  addFriend(item.id, item.friendList, item.userMail);
                }}
                className="  px-5 flex-row justify-between items-center w-full py-3 border-b border-black s ">
                <View className="flex-row items-center">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={{ uri: item.userImage }}></Image>
                  <View className="ml-5 ">
                    <Text className="font-bold text-lg">{item.userName}</Text>
                  </View>
                </View>
                <View className=" flex-col justify-center items-center gap-y-2">
                  {/* <Text className=" text-[12px] text-green-700">2:30 pm</Text> */}
                  <View className="bg-green-700 w-10 h-10  rounded-full justify-center items-center">
                    <Icon name="add" color={"white"} size={25}></Icon>
                  </View>
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

export default UserList;
