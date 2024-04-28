import { useCustomTheme } from "@/providers/CustomThemeProvider";
import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

export default function Text(props: RNTextProps) {
  const theme = useCustomTheme();
  return (
    <RNText
      style={{
        fontSize: 16,
        color: theme.colors.text.normal,
      }}
      {...props}
    />
  );
}
