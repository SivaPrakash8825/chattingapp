import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Icon from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetFirebase } from "../../../Firebase";
const UserDetails = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const dataRef = collection(GetFirebase, "userMail");

  useEffect(() => {
    const getData = async () => {
      const val = JSON.parse(await AsyncStorage.getItem("user"));
      // console.log(val);
      setUserDetails(val);
    };
    getData();
  }, []);
  const sendData = async () => {
    // console.log(userDetails.userMail);
    await addDoc(dataRef, {
      userMail: userDetails.userMail,
      userName: name,
      userImage: image,
      friendList: [],
      requestStatus: [],
    });
    navigation.navigate("Stack");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result.assets[0]);
    if (!result.canceled) {
      setLoading(true);
      const storage = getStorage();
      const reference = ref(
        storage,
        `${userDetails.userId}/${result.assets[0].uri.split("/").pop()}`
      );

      // Read the image file as a Blob
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      // Upload the image using the put method with the Blob
      uploadBytes(reference, blob)
        .then((snapshot) => {
          getDownloadURL(reference).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImage(downloadURL);
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };
  return (
    <View className=" w-screen h-screen justify-center items-center ">
      {loading ? (
        <View className="w-full h-[120vh] z-10 absolute flex justify-center items-center top-0">
          <ActivityIndicator size={"large"} />
          <View className="w-full h-full bg-red-300 opacity-[0.4] absolute -z-10"></View>
        </View>
      ) : (
        ""
      )}
      <View className="w-52 relative h-52 border border-black rounded-full ">
        <Pressable
          onPress={pickImage}
          className="bg-white rounded-full h-10 text-center justify-center items-center w-10"
          style={{
            position: "absolute",
            left: "39.5%",
            bottom: -20,
            zIndex: 100,
          }}>
          <Icon name="add" size={35} color={"black"}></Icon>
        </Pressable>
        <View className="w-full h-full rounded-full overflow-hidden">
          <Image className="w-full h-full" source={{ uri: image }}></Image>
        </View>
        {/* <View className="absolute left-6 bottom-2 z-20"> */}

        {/* </View> */}
      </View>

      <View className="mt-5">
        <TextInput
          value={name}
          onChangeText={(e) => {
            setName(e);
          }}
          placeholder="enter your name"
          className="w-72 h-14 mb-3 border border-black rounded-2xl pl-5"></TextInput>
        <Button title="save" onPress={sendData}></Button>
      </View>
    </View>
  );
};

export default UserDetails;
