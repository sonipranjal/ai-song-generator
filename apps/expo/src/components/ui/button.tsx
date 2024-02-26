import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { cn } from "~/utils/cn";

interface ButtonProps {
  onPressHandler: () => void;
  buttonText: string;
  className?: string;
  isLoading?: boolean;
}

export const Button = ({
  buttonText,
  onPressHandler,
  className,
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPressHandler}
      className={cn(
        "flex w-full items-center justify-center rounded-lg bg-black p-4",
        className,
      )}
    >
      <Text className="text-white">
        {isLoading ? "Loading..." : buttonText}
      </Text>
    </TouchableOpacity>
  );
};
