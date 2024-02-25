import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  onPressHandler: () => void;
  buttonText: string;
}

export const Button = ({ buttonText, onPressHandler }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPressHandler}
      className="flex w-full items-center justify-center rounded-lg bg-black p-4"
    >
      <Text className="text-white">{buttonText}</Text>
    </TouchableOpacity>
  );
};
