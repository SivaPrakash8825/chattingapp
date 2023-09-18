import React from "react";
import {
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  View,
  Image,
} from "react-native";
import Header from "./header/header";

const Home = ({ navigation }) => {
  const val = [
    {
      id: 1,
      name: "sisva",
    },
    {
      id: 2,
      name: "siva",
    },
    {
      id: 3,
      name: "siva",
    },
  ];
  const ContactList = () => {
    return (
      <SafeAreaView>
        <Header />
        <FlatList
          className="w-screen bg-red-600"
          data={val}
          renderItem={({ item }) => (
            <View className=" w-full bg-red-200">
              <Pressable
                onPress={() => {
                  navigation.navigate("Messages");
                }}
                className="  px-5 flex-row justify-between items-center w-full py-3 border-b border-black s ">
                <View className="flex-row items-center">
                  <Image
                    className="w-10 h-10 rounded-full"
                    source={require("../../assets/icon.png")}></Image>
                  <View className="ml-5 ">
                    <Text className="font-bold text-xl">{item.name}</Text>
                    <Text className=" text-[12px]">fasdf</Text>
                  </View>
                </View>
                <View className=" flex-col justify-center items-center gap-y-2">
                  <Text className=" text-[12px] text-green-700">2:30 pm</Text>
                  <Text className="bg-green-700 text-white w-5 rounded-full justify-center items-center text-center">
                    1
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  };
  return <ContactList />;
};

export default Home;
