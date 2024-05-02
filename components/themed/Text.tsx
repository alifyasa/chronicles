import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

import { useCustomTheme } from "@/providers/CustomThemeProvider";

export default function Text(props: RNTextProps) {
  const theme = useCustomTheme();
  const { style, ...restProps } = props;
  return (
    <RNText
      style={[
        {
          fontSize: 16,
          color: theme.colors.text.normal,
        },
        style,
      ]}
      {...restProps}
    />
  );
}
