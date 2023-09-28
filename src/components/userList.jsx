import React, { useEffect, useState, useRef } from "react";
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
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
  serverTimestamp,
  query,
  and,
  where,
  deleteDoc,
  or,
} from "firebase/firestore";
import { GetFirebase } from "../../Firebase";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {} from "@react-native-firebase/firestore";

const UserList = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const [allUser, setAllUser] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [curUser, setCurUser] = useState("");
  const userRef = collection(GetFirebase, "userMail");
  // const Friend = collection(GetFirebase, "friendList");
  const siva = async () => {
    const val = JSON.parse(await AsyncStorage.getItem("user"));
    // console.log(val);
    const requestRef = collection(
      GetFirebase,
      `requestList/user/${val.userMail}`
    );

    setCurUser(val);
    const ele = await getDocs(userRef);
    const ele2 = await getDocs(requestRef);
    const arr = [];
    const arr2 = [];

    ele.docs.map((data, index) => {
      // !data.data().friendList.includes(val.userMail) &&
      val.userMail != data.data().userMail &&
      !data.data().requestStatus.includes(val.userMail)
        ? arr.push({
            id: data.id,

            ...data.data(),
          })
        : [];
    });
    ele2.docs.map((data) => {
      !data.data().requestAccepted
        ? arr2.push({
            id: data.id,
            ...data.data(),
          })
        : [];
    });
    // console.log(arr);
    setRequestList(arr2);

    setAllUser(arr);
  };
  useEffect(() => {
    const setData = async () => {
      siva();
    };
    setData();
  }, []);

  const addFriend = async (
    id,
    friends,
    userName,
    Image,
    friendName,
    requestStatus
  ) => {
    // console.log(friendName);
    const updateValue = async () => {
      const userRef = collection(GetFirebase, `requestList/user/${userName}`);
      const filter = friends.filter((data) => {
        return data != curUser.userMail;
      });

      const val = await updateDoc(doc(GetFirebase, "userMail", id), {
        friendList: filter,
      });
      const arr = [];

      const data = await getDocs(
        query(userRef, where("senderMail", "==", curUser.userMail))
      );

      data.docs.map((data) => {
        // console.log(data);
        arr.push(data.id);
      });

      await deleteDoc(doc(GetFirebase, `requestList/user/${userName}`, arr[0]));
    };
    const addValue = async () => {
      friends.push(curUser.userMail);

      // console.log(friends);
      const val = await updateDoc(doc(GetFirebase, "userMail", id), {
        friendList: friends,
        // requestStatus: requestStatus,
      });
      const userChat = collection(GetFirebase, `requestList/user/${userName}`);
      const ele = await addDoc(userChat, {
        senderMail: curUser.userMail,
        arrTime: serverTimestamp(),
        friendName: curUser.userName,
        receiverMail: userName,
        receiverImage: curUser.userImage,
        requestAccepted: false,
        msg: null,
      });
    };

    friends.includes(curUser.userMail) ? updateValue() : addValue();

    siva();
  };
  const requestDenied = async () => {};
  const requestAccepted = async (item) => {
    // console.log(item);
    const userRef = collection(GetFirebase, `userMail`);
    const val = await updateDoc(
      doc(GetFirebase, `requestList/user/${item.receiverMail}`, item.id),
      {
        requestAccepted: true,

        // requestStatus: requestStatus,
      }
    );
    const userChat = collection(
      GetFirebase,
      `requestList/user/${item.senderMail}`
    );
    const details = await getDocs(
      query(
        userChat,
        and(
          where("receiverMail", "==", item.senderMail),
          where("senderMail", "==", item.receiverMail)
        )
      )
    );
    const arr = [];
    details.docs.map((data) => {
      arr.push(data.id);
    });
    arr.length <= 0
      ? await addDoc(userChat, {
          senderMail: curUser.userMail,
          arrTime: serverTimestamp(),
          friendName: curUser.userName,
          receiverMail: item.receiverMail,
          receiverImage: curUser.userImage,
          requestAccepted: true,
          msg: null,
        })
      : await updateDoc(
          doc(GetFirebase, `requestList/user/${item.senderMail}`, arr[0]),
          { requestAccepted: true }
        );

    const data = await getDocs(
      query(userRef, where("userMail", "==", item.senderMail))
    );

    const arr2 = [];
    const arr3 = [];
    data.docs.map((data) => {
      arr2.push(data.id);
      arr3.push(data.data().requestStatus);
    });
    const data2 = await getDocs(
      query(userRef, where("userMail", "==", item.receiverMail))
    );
    data2.docs.map((data) => {
      arr2.push(data.id);
      // console.log(data.data());
      arr3.push(data.data().requestStatus);
    });
    console.log(arr3);
    arr2.forEach(async (data, index) => {
      const val = await updateDoc(doc(GetFirebase, "userMail", data), {
        requestStatus:
          index == 0
            ? [...arr3[0], item.receiverMail]
            : [...arr3[1], item.senderMail],
      });
    });
    siva();
    // console.log(arr2);
  };
  const ContactList = () => {
    return (
      <BottomSheetModalProvider>
        <SafeAreaView className="w-screen h-screen relative">
          {/* <Header /> */}

          <FlatList
            className="w-screen h-auto"
            data={allUser}
            renderItem={({ item, index }) => (
              <View key={index} className=" w-full bg-red-200">
                <Pressable
                  onPress={() => {
                    addFriend(
                      item.id,
                      item.friendList,
                      item.userMail,
                      item.userImage,
                      item.userName,
                      item.requestStatus
                    );
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
                      {item.friendList.includes(curUser.userMail) ? (
                        <Icon
                          name="remove-circle-outline"
                          color={"white"}
                          size={25}></Icon>
                      ) : (
                        <Icon name="add" color={"white"} size={25}></Icon>
                      )}
                    </View>
                  </View>
                </Pressable>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />

          <Pressable onPress={openBottomSheet}>
            <View className="w-16 h-16 bg-green-700 absolute bottom-40 rounded-full right-5"></View>
          </Pressable>
          <BottomSheetModal ref={bottomSheetRef} index={0} snapPoints={["70%"]}>
            <FlatList
              className="w-screen h-auto"
              data={requestList}
              renderItem={({ item, index }) => (
                <View
                  key={index}
                  className=" w-full  px-5 flex-row justify-between items-center py-3  bg-red-200 border-b border-black s">
                  <View className="flex-row items-center">
                    <Image
                      className="w-10 h-10 rounded-full"
                      source={{ uri: item.receiverImage }}></Image>
                    <View className="ml-5 ">
                      <Text className="font-bold text-lg">
                        {item.friendName}
                      </Text>
                    </View>
                  </View>
                  <View className=" flex-row gap-3 justify-center items-center gap-y-2">
                    <Pressable
                      onPress={() => {
                        requestDenied(item);
                      }}>
                      <View className="bg-red-700 w-14 h-14  rounded-full justify-center items-center">
                        <Icon
                          name="close-sharp"
                          color={"white"}
                          size={25}></Icon>
                      </View>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        requestAccepted(item);
                      }}>
                      <View className="bg-green-700 w-14 h-14  rounded-full justify-center items-center">
                        <Icon name="checkmark" color={"white"} size={25}></Icon>
                      </View>
                    </Pressable>
                  </View>
                  {/* </Pressable> */}
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
          </BottomSheetModal>

          {/*  */}
        </SafeAreaView>
      </BottomSheetModalProvider>
    );
  };
  return <ContactList />;
};

export default UserList;
