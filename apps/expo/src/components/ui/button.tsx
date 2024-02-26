import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { cn } from "~/utils/cn";

interface ButtonProps {
  onPressHandler: () => void;
  buttonText: string;
  className?: string;
}

export const Button = ({
  buttonText,
  onPressHandler,
  className,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPressHandler}
      className={cn(
        "flex w-full items-center justify-center rounded-lg bg-black p-4",
        className,
      )}
    >
      <Text className="text-white">{buttonText}</Text>
    </TouchableOpacity>
  );
};
