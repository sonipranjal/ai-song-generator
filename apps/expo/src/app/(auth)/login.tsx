import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { Auth } from "~/components/auth";

const Login = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Login",
          headerShown: true,
        }}
      />
      <SafeAreaView>
        <Text className="mx-auto my-4 text-center text-2xl font-bold text-purple-500">
          Login with existing account
        </Text>
        <Auth formType="login" />
      </SafeAreaView>
    </>
  );
};

export default Login;
