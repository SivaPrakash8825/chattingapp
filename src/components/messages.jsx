import React from "react";
import { TextInput } from "react-native";
import { Image, View } from "react-native";
import { ScrollView } from "react-native";
import { Pressable, Text } from "react-native";

const Messages = ({ navigation }) => {
  return (
    <ScrollView>
      <View className="w-screen h-[93.3vh] bg-gray-400">
        <View className="w-screen h-auto bg-red-800">
          <View className="max-w-[70%] my-1 self-start  rounded-2xl rounded-tl-none bg-blue-700  py-2 px-6 ml-12">
            <Text className="w-3 h-3 rotate-45 absolute top-1 bg-blue-700 -left-1"></Text>
            <Text>right</Text>
            <Image
              className=" w-5 h-5 rounded-full absolute -left-9 top-0"
              source={require("../.../../../assets/icon.png")}></Image>
          </View>
          <View className="max-w-[70%] my-1  relative rounded-2xl rounded-tr-none bg-blue-700 self-end py-2 px-6 mr-12">
            <Text className="w-3 h-3 rotate-45 absolute top-1 bg-blue-700 -right-1 "></Text>
            <Text className=" text-justify">
              right Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam a, molestias velit aperiam laboriosam aliquid ut impedit
              quam natus repudiandae sint deleniti nemo quas nam exercitationem
              illum dignissimos? Dolorem, dolor.
            </Text>
            <Image
              className=" w-5 h-5 rounded-full absolute -right-9 top-0"
              source={require("../.../../../assets/icon.png")}></Image>
          </View>
        </View>
        <TextInput className=" absolute bg-white w-full h-10 bottom-0"></TextInput>
      </View>
    </ScrollView>
  );
};

export default Messages;
