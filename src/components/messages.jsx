import Icon from "react-native-vector-icons/Ionicons";

import React from "react";
import { Image, View } from "react-native";

import { Pressable } from "react-native";
import { ScrollView } from "react-native";
import { Text, TextInput } from "react-native";

const Messages = ({ navigation }) => {
  return (
    <View className="flex-1">
      <View className="w-screen h-[93.3vh] relative pb-14 bg-gray-400">
        <ScrollView>
          <View className="w-screen h-auto  ">
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
                Quisquam a, molestias velit aperiam laboriosam aliquid ut
                impedit quam natus repudiandae sint deleniti nemo quas nam
                exercitationem illum dignissimos? Dolorem, dolor.
              </Text>
              <Image
                className=" w-5 h-5 rounded-full absolute -right-9 top-0"
                source={require("../.../../../assets/icon.png")}></Image>
            </View>
            <View className="max-w-[70%] my-1  relative rounded-2xl rounded-tr-none bg-blue-700 self-end py-2 px-6 mr-12">
              <Text className="w-3 h-3 rotate-45 absolute top-1 bg-blue-700 -right-1 "></Text>
              <Text className=" text-justify">
                right Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam a, molestias velit aperiam laboriosam aliquid ut
                impedit quam natus repudiandae sint deleniti nemo quas nam
                exercitationem illum dignissimos? Dolorem, dolor.
              </Text>
              <Image
                className=" w-5 h-5 rounded-full absolute -right-9 top-0"
                source={require("../.../../../assets/icon.png")}></Image>
            </View>
            <View className="max-w-[70%] my-1  relative rounded-2xl rounded-tr-none bg-blue-700 self-end py-2 px-6 mr-12">
              <Text className="w-3 h-3 rotate-45 absolute top-1 bg-blue-700 -right-1 "></Text>
              <Text className=" text-justify">
                right Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam a, molestias velit aperiam laboriosam aliquid ut
                impedit quam natus repudiandae sint deleniti nemo quas nam
                exercitationem illum dignissimos? Dolorem, dolor.
              </Text>
              <Image
                className=" w-5 h-5 rounded-full absolute -right-9 top-0"
                source={require("../.../../../assets/icon.png")}></Image>
            </View>
            <View className="max-w-[70%] my-1  relative rounded-2xl rounded-tr-none bg-blue-700 self-end py-2 px-6 mr-12">
              <Text className="w-3 h-3 rotate-45 absolute top-1 bg-blue-700 -right-1 "></Text>
              <Text className=" text-justify">
                right Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam a, molestias velit aperiam laboriosam aliquid ut
                impedit quam natus repudiandae sint deleniti nemo quas nam
                exercitationem illum dignissimos? Dolorem, dolor.
              </Text>
              <Image
                className=" w-5 h-5 rounded-full absolute -right-9 top-0"
                source={require("../.../../../assets/icon.png")}></Image>
            </View>
            <View className="max-w-[70%] my-1  relative rounded-2xl rounded-tr-none bg-blue-700 self-end py-2 px-6 mr-12">
              <Text className="w-3 h-3 rotate-45 absolute top-1 bg-blue-700 -right-1 "></Text>
              <Text className=" text-justify">
                right Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam a, molestias velit aperiam laboriosam aliquid ut
                impedit quam natus repudiandae sint deleniti nemo quas nam
                exercitationem illum dignissimos? Dolorem, dolor.
              </Text>
              <Image
                className=" w-5 h-5 rounded-full absolute -right-9 top-0"
                source={require("../.../../../assets/icon.png")}></Image>
            </View>
          </View>
        </ScrollView>
      </View>

      <View className="absolute  bottom-1 h-12  w-full ">
        <View className="w-full h-full flex-1 gap-x-1 items-center flex-row px-2">
          <TextInput
            className="bg-white pl-5 rounded-2xl w-[84%] h-full"
            placeholder="Message"></TextInput>

          <Pressable className=" w-12 h-12 bg-green-600 rounded-full justify-center items-center">
            <Icon name="send" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Messages;
