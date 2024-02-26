import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="main" />
      <Stack.Screen name="generate-song" />
    </Stack>
  );
};

export default HomeLayout;
