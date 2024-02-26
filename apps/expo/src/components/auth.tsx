import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";

const formSchema = z.object({
  email: z.string().email({
    message: "email must be valid.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});

interface AuthProps {
  formType: "register" | "login";
}

export const Auth = ({ formType }: AuthProps) => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);

  const handleAuth = async (values: z.infer<typeof formSchema>) => {
    try {
      if (formType === "register") {
        const {
          data: { session },
          error,
        } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) Alert.alert(error.message);
        if (!session) {
          Alert.alert("Please check your inbox for email verification!");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) Alert.alert(error.message);
      }
    } catch (error) {
      Alert.alert("something went wrong while signing up!");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.push("/home/main");
    }
  }, [user]);

  return (
    <View>
      <View className="gap-4 p-4">
        <Controller
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="john@google.com"
              className="rounded border border-gray-400/50 bg-white p-4"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
        />

        {form.formState.errors.email && (
          <Text className="text-sm font-light text-red-500">
            {form.formState.errors.email?.message}
          </Text>
        )}

        <Controller
          control={form.control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="******"
              className="rounded border border-gray-400/50 bg-white p-4"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
          rules={{ required: true }}
        />

        {form.formState.errors.password && (
          <Text className="text-sm font-light text-red-500">
            {form.formState.errors.password?.message}
          </Text>
        )}

        <Button
          buttonText={
            loading
              ? "loading..."
              : formType === "register"
                ? "Register"
                : "Login"
          }
          onPressHandler={form.handleSubmit(handleAuth)}
        />
      </View>
    </View>
  );
};
