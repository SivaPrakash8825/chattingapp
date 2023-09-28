import Icon from "react-native-vector-icons/Ionicons";

import React, { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
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

  // useEffect(() => {
  //   // console.log(viewPort);
  //   if (viewPort.current) {
  //     viewPort.current.scrollToIndex({ index: 3, animated: true });
  //   }
  // }, []);
  useEffect(() => {
    const getStorageData = async () => {
      const val = JSON.parse(await AsyncStorage.getItem("user"));
      setSenderId({ ...val, receiverId: route.params.receiverId });
    };

    getStorageData();
    getAllData();
  }, []);

  const sendData = async () => {
    const userChat = collection(GetFirebase, `user/chat/${sendId.userMail}`);
    const userChat2 = collection(
      GetFirebase,
      `user/chat/${params.route.receiverId}`
    );
    const val = await addDoc(messageRef, {
      senderId: sendId.userId,
      senderMail: sendId.userMail,
      msg: msg,
      arrTime: serverTimestamp(),
      receiverMail: route.params.receiverId,
    });
    const data = await getDocs(
      query(
        userChat,
        and(
          where("senderMail", "==", sendId.userMail),
          where("receiverMail", "==", route.params.receiverId)
        )
      )
    );

    let arr = [];
    data.docs.map((snapshot) => {
      arr.push(snapshot.id);
    });
    if (arr.length > 0) {
      await updateDoc(
        doc(GetFirebase, `user/chat/${route.params.receiverId}`, arr[0]),
        {
          arrTime: serverTimestamp(),
          msg: msg,
        }
      );
      // await updateDoc(
      //   doc(GetFirebase, `user/chat/${sendId.userMail}`, arr[0]),
      //   {
      //     arrTime: serverTimestamp(),
      //     msg: msg,
      //   }
      // );
    } else {
      // const userChat2 = collection(GetFirebase, `user/chat/${sendId.userMail}`);
      const ele = await addDoc(userChat, {
        senderMail: sendId.userMail,
        arrTime: serverTimestamp(),
        receiverMail: route.params.receiverId,
        receiverImage: route.params.userImage,
        msg: msg,
      });
      // const ele2 = await addDoc(userChat2, {
      //   senderMail: sendId.userMail,
      //   arrTime: serverTimestamp(),
      //   receiverMail: route.params.receiverId,
      //   receiverImage: route.params.userImage,
      //   msg: msg,
      // });
    }

    Setmsg("");
  };
  return (
    <View className="flex-1">
      <View className="w-screen h-[93.3vh] relative pb-14  ">
        <Image
          className="w-full h-[100vh] absolute -z-1"
          source={require("../../assets/chatbackground.jpg")}></Image>
        <ScrollView
          ref={viewPort}
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
      </View>

      <View className="absolute  bottom-1 h-12  w-full ">
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
            className=" w-12 h-12 bg-green-500 rounded-full justify-center items-center">
            <Icon name="send" size={24} color="white" />
          </Pressable>
        </View>
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
