import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const formSchema = z.object({
  youtubeUrl: z.string().url({
    message: "must be a valid youtube url.",
  }),
  voiceName: z.string().min(2, {
    message: "must be at least 2 chars.",
  }),
});

const CreateCustomVoice = () => {
  const insets = useSafeAreaInsets();

  const createCustomVoice = api.replicate.createCustomVoice.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleCreateCustomVoice = (values: z.infer<typeof formSchema>) => {
    createCustomVoice.mutate(values, {
      onSuccess: () => {
        Alert.alert(
          "custom voice is being created",
          "please wait for some time, we will email you once it is ready.",
        );
        router.push("/home/main");
        form.reset();
      },
    });
  };

  return (
    <SafeAreaView className="">
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={{
          top: insets.top,
        }}
        className="absolute right-4 z-10"
      >
        <FontAwesome name="times" size={24} color="black" />
      </TouchableOpacity>
      <View className="my-auto flex h-full justify-start gap-4 p-4">
        <Text className="text-2xl font-semibold text-gray-900">
          Put a youtube url of the custom voice from which you wanna generate
          the song
        </Text>
        <View className="gap-6">
          <View>
            <Text className="text-lg font-light text-gray-900">
              Youtube url of voice
            </Text>
            <Controller
              control={form.control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="https://youtu.be/huqCKsj60s4"
                  className="rounded border border-gray-400/50 bg-white p-4"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="youtubeUrl"
              rules={{ required: true }}
            />
            {form.formState.errors.youtubeUrl && (
              <Text className="text-sm font-light text-red-500">
                {form.formState.errors.youtubeUrl?.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-lg font-light text-gray-900">Voice Name</Text>
            <Controller
              control={form.control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="john doe"
                  className="rounded border border-gray-400/50 bg-white p-4"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="voiceName"
              rules={{ required: true }}
            />

            {form.formState.errors.voiceName && (
              <Text className="text-sm font-light text-red-500">
                {form.formState.errors.voiceName?.message}
              </Text>
            )}
          </View>

          <Button
            buttonText="Create custom voice"
            onPressHandler={() => {
              form.handleSubmit(handleCreateCustomVoice)();
            }}
            isLoading={createCustomVoice.isPending}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateCustomVoice;
