import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import StackNav from "./src/stacknav";

export default function App() {
  // const analytics = getAnalytics(app);
  return (
    // <Pressable onPress={sendData}>
    //   <Text className="mt-20">send</Text>
    // </Pressable>
    // <>
    // <Text  onPress={sendData}></Text>
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
    // </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
