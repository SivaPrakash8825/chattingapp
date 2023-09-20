import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { Button } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
const UserDetails = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className=" w-screen h-screen justify-center items-center ">
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
          placeholder="enter your name"
          className="w-72 h-14 mb-3 border border-black rounded-2xl pl-5"></TextInput>
        <Button
          title="save"
          onPress={() => {
            navigation.navigate("Stack");
          }}></Button>
      </View>
    </View>
  );
};

export default UserDetails;
