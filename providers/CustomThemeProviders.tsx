import React from "react";
import { CustomTheme } from "@/constants/themes";
import { DarkBlueTheme, DefaultBlueTheme } from "@/constants/themes/BlueTheme";
import { PropsWithChildren, createContext, useContext } from "react";
import { useColorScheme } from "react-native";

export const CustomThemeContext = createContext<CustomTheme>(DefaultBlueTheme);
export function useCustomTheme() {
  const value = useContext(CustomThemeContext);
  return value;
}

export function CustomThemeProvider(props: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const customTheme =
    colorScheme === "light" ? DefaultBlueTheme : DarkBlueTheme;
  return (
    <CustomThemeContext.Provider value={customTheme}>
      {props.children}
    </CustomThemeContext.Provider>
  );
}
