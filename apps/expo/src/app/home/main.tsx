import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const MainScreen = () => {
  const supabase = useSupabaseClient();
  const getAllVoices = api.voice.getAllVoices.useQuery();
  const getAllGeneratedSongs = api.voice.getAllGeneratedSongs.useQuery();

  return (
    <SafeAreaView>
      <ScrollView className="mb-8 p-4">
        <View className="flex w-full flex-row flex-wrap justify-center gap-4">
          {getAllVoices.isSuccess &&
            getAllVoices.data.allVoices.map((voice) => (
              <TouchableOpacity
                key={voice.id}
                onPress={() => {
                  router.push({
                    pathname: "/home/generate-song",
                    params: { voiceId: voice.id },
                  });
                }}
                className="flex min-h-[190px] min-w-[190px] items-center justify-center rounded-3xl bg-black/40"
              >
                <Text>{voice.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <View className="my-4">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-semibold text-black">
              Recently generated songs
            </Text>
            <Button
              buttonText="See All"
              onPressHandler={() => {}}
              className="w-fit"
            />
          </View>
          <FlashList
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    const params = {
                      url: item.audioUrl ?? "",
                    };

                    router.push({
                      pathname: "/home/play-song",
                      params,
                    });
                  }}
                  className="mt-4 flex h-16 w-full items-center justify-center rounded-lg bg-purple-600"
                >
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
            estimatedItemSize={64}
            data={getAllGeneratedSongs.data?.allGeneratedSongs}
          />
        </View>
      </ScrollView>
      <View className="h-[20%] gap-4 px-4">
        <Button
          buttonText="Generate custom song"
          onPressHandler={() => {
            router.push("/home/create-custom-voice");
          }}
        />
        <Button
          buttonText="Sign out"
          onPressHandler={async () => {
            await supabase.auth.signOut();
            router.push("/");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
