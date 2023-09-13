import React from "react";
import {
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  View,
  Image,
} from "react-native";

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
        <FlatList
          className="w-screen bg-red-600"
          data={val}
          renderItem={({ item }) => (
            <View className=" w-full bg-red-200">
              <Pressable
                onPress={() => {
                  navigation.navigate("Messages");
                }}
                className="  px-5 flex-row items-center w-full py-3 border-b border-black s ">
                <Image
                  className="w-10 h-10 rounded-full"
                  source={require("../../assets/icon.png")}></Image>
                <Text className="ml-5 font-bold text-xl">{item.name}</Text>
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
