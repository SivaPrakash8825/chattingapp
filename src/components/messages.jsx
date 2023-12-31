import Icon from "react-native-vector-icons/Ionicons";

import React, { useEffect, useRef, useState } from "react";
import { useKeyboard } from "@react-native-community/hooks";
import { Image, KeyboardAvoidingView, View } from "react-native";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  where,
  and,
  or,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Pressable } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native";

import { GetFirebase } from "../../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Messages = ({ navigation, route }) => {
  const { keyboardHeight, keyboardShown } = useKeyboard();
  const [msg, Setmsg] = useState("");
  const viewPort = useRef();
  const [sendId, setSenderId] = useState("");
  const [allMsg, setAllmsg] = useState([]);
  const [focus, setFocus] = useState(false);

  const messageRef = collection(GetFirebase, "Message");

  const getAllData = async () => {
    const val = JSON.parse(await AsyncStorage.getItem("user"));
    // console.log(val);
    const quer = query(
      messageRef,
      or(
        and(
          where("senderMail", "==", val.userMail),
          where("receiverMail", "==", route.params.receiverId)
        ),
        and(
          where("receiverMail", "==", val.userMail),
          where("senderMail", "==", route.params.receiverId)
        )
      ),
      orderBy("arrTime")
    );
    // console.log(viewPort.current);

    onSnapshot(quer, (snapshot) => {
      let data = [];

      snapshot.docs.length > data.length
        ? snapshot.docs.forEach((doc) => {
            data.push(doc.data());
          })
        : [];
      // console.log(data);
      const len = data.length - 1;

      allMsg.length <= 0
        ? setAllmsg(data)
        : len + 1 < allMsg.length
        ? setAllmsg((e) => [...e, data[len]])
        : [];
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.friendName}`,
    });
    const getStorageData = async () => {
      const val = JSON.parse(await AsyncStorage.getItem("user"));

      setSenderId({ ...val, receiverId: route.params.receiverId });
      const arr2 = await getDataId();
      // console.log(route.params.receiverId);
      // console.log(arr2);
      await updateDoc(
        doc(GetFirebase, `requestList/user/${val.userMail}`, arr2[0]),
        {
          newMsgCount: 0,
        }
      );
    };
    getStorageData();
    getAllData();
  }, []);
  const getDataId = async () => {
    const val = JSON.parse(await AsyncStorage.getItem("user"));
    const userChat = collection(
      GetFirebase,
      `requestList/user/${val.userMail}`
    );
    const data = await getDocs(
      query(
        userChat,
        or(
          and(
            where("receiverMail", "==", val.userMail),
            where("senderMail", "==", route.params.receiverId)
          ),
          and(
            where("senderMail", "==", val.userMail),
            where("receiverMail", "==", route.params.receiverId)
          )
        )
      )
    );
    let arr = [];
    data.docs.map((snapshot) => {
      // console.log(snapshot.data());
      arr.push(snapshot.id);
    });
    return arr;
  };
  const sendData = async () => {
    const userChat2 = collection(
      GetFirebase,
      `requestList/user/${route.params.receiverId}`
    );
    // console.log(sendId.userMail, route.params.receiverId);
    const val = await addDoc(messageRef, {
      senderId: sendId.userId,
      senderMail: sendId.userMail,
      msg: msg,
      date: null,
      arrTime: serverTimestamp(),
      receiverMail: route.params.receiverId,
    });

    const data2 = await getDocs(
      query(
        userChat2,
        or(
          and(
            where("receiverMail", "==", sendId.userMail),
            where("senderMail", "==", route.params.receiverId)
          ),
          and(
            where("senderMail", "==", sendId.userMail),
            where("receiverMail", "==", route.params.receiverId)
          )
        )
      )
    );
    const arr2 = [];
    data2.docs.map((snapshot) => {
      arr2.push({ id: snapshot.id, count: snapshot.data().newMsgCount });
    });

    let arr = await getDataId();

    if (arr.length > 0) {
      await updateDoc(
        doc(GetFirebase, `requestList/user/${sendId.userMail}`, arr[0]),
        {
          arrTime: serverTimestamp(),
          date: new Date(),
          msg: msg,
        }
      );
      await updateDoc(
        doc(
          GetFirebase,
          `requestList/user/${route.params.receiverId}`,
          arr2[0].id
        ),
        {
          arrTime: serverTimestamp(),
          msg: msg,
          date: new Date(),
          newMsgCount: arr2[0].count + 1,
        }
      );
    } else {
      console.log("else");
    }

    Setmsg("");
  };
  return (
    <View className="flex-1">
      <View className="w-screen h-[100vh] relative pb-14  ">
        <Image
          className="w-full h-[100vh] absolute -z-1"
          source={require("../../assets/chatbackground.jpg")}></Image>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={90}
          behavior="height"
          enabled>
          <ScrollView
            // pagingEnabled
            // horizontal
            // showsHorizontalScrollIndicator={false}

            ref={viewPort}
            contentContainerStyle={{
              paddingBottom: keyboardShown ? 12 : 0,
            }}
            onContentSizeChange={() => {
              viewPort.current.scrollToEnd({ animated: true });
            }}>
            <View className="w-screen h-auto ">
              {allMsg.map((data, id) => {
                return data.senderId == sendId.userId ? (
                  <View
                    style={{ backgroundColor: "white" }}
                    key={id}
                    className="max-w-[70%] my-3  relative rounded-md rounded-tr-none  self-end py-2 px-6 mr-6">
                    <Text style={style.triangleCorner}></Text>
                    <Text className=" text-justify">{data.msg}</Text>
                  </View>
                ) : (
                  <View
                    key={id}
                    style={{ backgroundColor: "rgba(0,0,0, 0.2)" }}
                    className="max-w-[70%] mt-5 self-start  rounded-md rounded-tl-none bg-black  py-2 px-6 ml-12">
                    <Text style={style.triangleCorner2}></Text>
                    <Text className="text-white">{data.msg}</Text>
                    <Image
                      className=" w-5 h-5 rounded-full absolute -left-9 -top-2"
                      source={{ uri: route.params.userImage }}></Image>
                  </View>
                );
              })}
            </View>
            <View ref={viewPort}></View>
          </ScrollView>
          <View className=" h-12  w-full mb-2 ">
            <View className="w-full h-full flex-1 gap-x-1 items-center flex-row px-2">
              <TextInput
                value={msg}
                onFocus={() => {
                  // console.log(focus);
                  setFocus(true);
                }}
                onBlur={() => {
                  // console.log(focus);
                  setFocus(false);
                }}
                onChangeText={(e) => {
                  Setmsg(e);
                }}
                className="bg-white pl-5 rounded-2xl w-[84%] h-full"
                placeholder="Message"></TextInput>

              <Pressable
                onPress={sendData}
                className=" w-12 h-12 bg-green-500  rounded-full justify-center items-center">
                <Icon name="send" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  triangleCorner: {
    position: "absolute",
    right: -8,
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderRightColor: "transparent",
    borderTopColor: "white",
  },
  triangleCorner2: {
    position: "absolute",
    left: -8,
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderRightColor: "transparent",
    borderTopColor: "rgba(0,0,0, 0.2)",

    transform: [
      {
        rotate: "90deg",
      },
    ],
  },
});

export default Messages;
