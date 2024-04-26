import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { View } from "react-native";
import { SessionProvider } from "@/providers/AuthProviders";
import { DefaultTheme } from "@/constants/Theme";
import { CustomThemeProvider } from "@/providers/CustomThemeProviders";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-toast-message";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    // https://github.com/expo/expo/issues/27099#issuecomment-1959010092
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <CustomThemeProvider>
        <SessionProvider>
            <Stack>
              <Stack.Screen
                name="(app)"
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="(auth)/login"
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
            </Stack>
            <Toast />
        </SessionProvider>
      </CustomThemeProvider>
    </View>
  );
}
