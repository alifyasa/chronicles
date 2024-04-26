import { Theme } from "@react-navigation/native";
import { TextStyle, ViewStyle } from "react-native";

export type CustomTheme = Theme & {
  custom: {
    palette: {
      errorRed: ViewStyle["backgroundColor"] | TextStyle["color"];
      textDim: TextStyle["color"];
    };
  };
};

export const DefaultTheme: CustomTheme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "rgb(255, 255, 255)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
  custom: {
    palette: {
      errorRed: "#DC143C",
      textDim: "#9A9A9A",
    },
  },
};

export const DarkTheme: CustomTheme = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)",
    background: "rgb(1, 1, 1)",
    card: "rgb(18, 18, 18)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
  custom: {
    palette: {
      errorRed: "#DC143C",
      textDim: "#9A9A9A",
    },
  },
};
