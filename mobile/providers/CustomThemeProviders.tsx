import { CustomTheme, DarkTheme, DefaultTheme } from "@/constants/Theme";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export const CustomThemeContext = createContext<CustomTheme>(DefaultTheme);
export function useCustomTheme() {
  const value = useContext(CustomThemeContext);
  return value;
}

export function CustomThemeProvider(props: PropsWithChildren) {
  const colorScheme = useColorScheme()
  const customTheme = colorScheme === "light" ? DefaultTheme : DarkTheme
  return <CustomThemeContext.Provider value={customTheme}>{props.children}</CustomThemeContext.Provider>;
}
