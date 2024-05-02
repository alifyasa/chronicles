import { BluePalette } from "../palettes/BluePalette";
import { CustomTheme } from ".";

export const DefaultBlueTheme: CustomTheme = {
  dark: false,
  colors: {
    border: BluePalette.accent["600"],
    background: BluePalette.background["50"],
    pressable: {
      pressed: BluePalette.background["200"],
      normal: BluePalette.background["100"],
    },
    dangerousPressable: {
      background: {
        normal: "hsl(350, 80%, 50%)",
        pressed: "hsl(350, 80%, 60%)",
      },
      text: BluePalette.text["50"],
    },
    text: {
      normal: BluePalette.text["950"],
      dim: BluePalette.text["700"],
      error: "hsl(350, 80%, 60%)",
    },
    card: {
      background: BluePalette.secondary["500"],
      text: BluePalette.text["500"],
    },
  },
};

export const DarkBlueTheme: CustomTheme = {
  dark: true,
  colors: {
    background: BluePalette.background["950"],
    border: BluePalette.accent["400"],
    pressable: {
      pressed: BluePalette.background["700"],
      normal: BluePalette.background["800"],
    },
    dangerousPressable: {
      background: {
        normal: "hsl(350, 80%, 40%)",
        pressed: "hsl(350, 80%, 50%)",
      },
      text: BluePalette.text["50"],
    },
    text: {
      normal: BluePalette.text["50"],
      dim: BluePalette.text["300"],
      error: "hsl(350, 80%, 40%)",
    },
    card: {
      background: BluePalette.secondary["500"],
      text: BluePalette.text["500"],
    },
  },
};
