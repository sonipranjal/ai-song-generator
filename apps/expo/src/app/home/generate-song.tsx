import React from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
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
});

const GenerateSong = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const generateSong = api.voice.generateAISong.useMutation();

  const handleGenerateSong = (values: z.infer<typeof formSchema>) => {
    if (!params.voiceId || typeof params.voiceId !== "string") {
      return Alert.alert("we can't find this voice!");
    }

    generateSong.mutate(
      {
        voiceId: params.voiceId,
        youtubeUrl: values.youtubeUrl,
      },
      {
        onSuccess: () => {
          Alert.alert("song is being generated!");
          router.push("/home/main");
        },
        onError: () => {
          Alert.alert("something went wrong while generating the song!");
        },
      },
    );
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
        <View className="my-4 flex items-center">
          <Image
            source={{
              uri: "https://images.unsplash.com/flagged/photo-1561618178-a1635b596bf0?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="h-64 w-64 rounded-xl bg-black shadow"
          />
        </View>
        <Text className="text-2xl font-semibold text-gray-900">
          Put a youtube url of the song you wanna generate
        </Text>
        <View className="gap-4">
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

          <Button
            buttonText="Generate Song"
            onPressHandler={form.handleSubmit(handleGenerateSong)}
            isLoading={generateSong.isPending}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GenerateSong;
