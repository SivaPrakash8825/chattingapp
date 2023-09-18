import React, { useState } from "react";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const Header = () => {
  const [searchactive, setSearchActive] = useState(false);
  return (
    <View className="mt-8 w-screen h-16 bg-gray-500">
      <View className="w-full h-full flex-1 px-3 justify-between items-center flex-row">
        <Text className=" text-2xl font-semibold capitalize">whatsapp</Text>
        <Pressable
          onPress={() => setSearchActive(true)}
          className="absolte right-4">
          <Icon name="search" size={34} color={"black"}></Icon>
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
