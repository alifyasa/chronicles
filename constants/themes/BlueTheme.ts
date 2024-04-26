import { CustomTheme } from ".";
import { BluePalette } from "../palettes/BluePalette";

export const DefaultBlueTheme: CustomTheme = {
  dark: false,
  colors: {
    text: BluePalette.text["950"],
    primary: BluePalette.primary["700"],
    background: BluePalette.background["50"],
    card: BluePalette.secondary["300"],
    border: BluePalette.accent["600"],
    notification: BluePalette.secondary["300"],
  },
  custom: {
    colors: {
      errorRed: "#DC143C",
      pressable: {
        active: BluePalette.background["300"],
        inactive: BluePalette.background["200"]
      },
      text: {
        normal: BluePalette.text["950"],
        dim: BluePalette.text["700"],
        error: "hsl(350, 80%, 40%)"
      }
    },
    palette: BluePalette
  },
};

export const DarkBlueTheme: CustomTheme = {
  dark: true,
  colors: {
    text: BluePalette.text["50"],
    primary: BluePalette.primary["300"],
    background: BluePalette.background["950"],
    card: BluePalette.secondary["700"],
    border: BluePalette.accent["400"],
    notification: BluePalette.secondary["700"],
  },
  custom: {
    colors: {
      errorRed: "rgb(142, 15, 36)",
      pressable: {
        active: BluePalette.background["700"],
        inactive: BluePalette.background["800"]
      },
      text: {
        normal: BluePalette.text["50"],
        dim: BluePalette.text["300"],
        error: "hsl(350, 80%, 40%)"
      }
    },
    palette: BluePalette
  },
};
