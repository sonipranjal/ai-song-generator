import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUser } from "@supabase/auth-helpers-react";
import LottieView from "lottie-react-native";

const Index = () => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push("/home/main");
    }
  }, [user]);

  return (
    <SafeAreaView>
      <LottieView
        autoPlay
        style={{
          width: "100%",
          height: "60%",
        }}
        source={require("../../assets/lottie/onboarding.json")}
      />
      <Text className="text-center text-2xl font-bold text-purple-700">
        Welcome to AI Song Generator
      </Text>
      <View className="mx-auto mt-auto flex w-full max-w-[80%] items-center gap-6 p-4">
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/register");
          }}
          className="flex w-full items-center justify-center rounded-lg bg-black p-4"
        >
          <Text className="text-white">Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/login");
          }}
          className="flex w-full items-center justify-center rounded-lg border border-black bg-white p-4"
        >
          <Text className="text-black">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;
