import * as SystemUI from "expo-system-ui";
import React, { useEffect } from "react";
import { createContext, PropsWithChildren, useContext } from "react";
import { useColorScheme } from "react-native";

import { CustomTheme } from "@/constants/themes";
import { DarkBlueTheme, DefaultBlueTheme } from "@/constants/themes/BlueTheme";

export const CustomThemeContext = createContext<CustomTheme>(DefaultBlueTheme);
export function useCustomTheme() {
  const value = useContext(CustomThemeContext);
  return value;
}

export function CustomThemeProvider(props: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const customTheme =
    colorScheme === "light" ? DefaultBlueTheme : DarkBlueTheme;

  // Change root color
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(customTheme.colors.background);
  }, [colorScheme]);
  return (
    <CustomThemeContext.Provider value={customTheme}>
      {props.children}
    </CustomThemeContext.Provider>
  );
}
