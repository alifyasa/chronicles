import { themeStore } from "@/stores";
import { observer } from "mobx-react";
import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

function Text(props: RNTextProps) {
  const { theme } = themeStore;
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

export default observer(Text);
