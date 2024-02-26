import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { useColorScheme } from "nativewind";

import { supabase } from "~/utils/supabase";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <TRPCProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <StatusBar />
      </TRPCProvider>
    </SessionContextProvider>
  );
}
