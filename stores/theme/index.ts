import { makeAutoObservable } from "mobx";
import { ColorSchemeName } from "react-native";

import { CustomTheme } from "@/constants/themes";
import { DarkBlueTheme, DefaultBlueTheme } from "@/constants/themes/BlueTheme";

class ThemeStore {
  constructor() {
    makeAutoObservable(this);
  }
  theme: CustomTheme = DefaultBlueTheme;
  setTheme(colorScheme: ColorSchemeName) {
    if (colorScheme === "light") {
      this.theme = DefaultBlueTheme;
    } else {
      this.theme = DarkBlueTheme;
    }
  }
}
const themeStore = new ThemeStore();
export { themeStore };
