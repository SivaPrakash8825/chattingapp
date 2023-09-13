import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { Pressable, Text } from "react-native";

const Messages = ({ navigation }) => {
  return (
    <ScrollView>
      <View className="w-screen h-auto bg-red-800">
        <View className="max-w-[70%] my-1 self-start rounded-2xl bg-blue-700  py-2 px-6 ml-4">
          <Text>right</Text>
        </View>
        <View className="max-w-[70%] my-1 rounded-2xl bg-blue-700 self-end py-2 px-6 mr-4">
          <Text className=" text-justify">
            right Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam a, molestias velit aperiam laboriosam aliquid ut impedit
            quam natus repudiandae sint deleniti nemo quas nam exercitationem
            illum dignissimos? Dolorem, dolor.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Messages;
