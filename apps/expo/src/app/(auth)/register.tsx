import React from "react";
import { Text, View } from "react-native";
import { Stack } from "expo-router";

import { Auth } from "~/components/auth";

const Register = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Register",
          headerShown: true,
        }}
      />
      <View>
        <Text className="mx-auto my-4 text-center text-2xl font-bold text-purple-600">
          Register for a new account
        </Text>
        <Auth formType="register" />
      </View>
    </>
  );
};

export default Register;
