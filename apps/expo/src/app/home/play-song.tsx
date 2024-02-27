import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { Button } from "~/components/ui/button";

const _sound = new Audio.Sound();

const PlaySong = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  console.log(params);

  const playSound = async () => {
    if (!params.url || typeof params.url !== "string") {
      return Alert.alert("we can't find this song!");
    }
    try {
      !_sound._loaded &&
        (await _sound.loadAsync({
          uri: params.url,
        }));
      await _sound.playAsync();
    } catch (error) {
      console.error(error);
    }
  };

  const pauseSound = async () => {
    await _sound?.pauseAsync();
  };

  // todo:
  const downloadSong = async () => {};

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
          Play generated song
        </Text>
        <Text className="text-sm font-semibold text-gray-900">
          Generate song from youtube video
        </Text>
        <View className="gap-4">
          <View className="flex flex-row justify-center gap-4">
            <Button
              buttonText="Play"
              onPressHandler={() => playSound()}
              className="w-[50%]"
            />
            <Button
              buttonText="Pause"
              onPressHandler={pauseSound}
              className="w-[50%]"
            />
          </View>
          <View>
            <Button buttonText="Download Song" onPressHandler={downloadSong} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlaySong;
