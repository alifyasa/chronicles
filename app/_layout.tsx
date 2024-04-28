import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { SessionProvider } from "@/providers/AuthProvider";
import { CustomTheme } from "@/constants/themes";
import { CustomThemeProvider } from "@/providers/CustomThemeProvider";
import { DarkBlueTheme, DefaultBlueTheme } from "@/constants/themes/BlueTheme";
import Toast from "react-native-toast-message";
import toastConfig from "@/components/toastConfig";
import { View } from "react-native";
import { createDefaultLogger } from "@/utils/logging";
import { getRouteNamesRecursive } from "@/utils/navigation/getRouteNameRecursive";

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

const logger = createDefaultLogger("NAV");
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const nav = useNavigation();

  nav.addListener("state", (event) => {
    const routeNames: string[] = getRouteNamesRecursive(
      event.data.state.routes
    );
    logger.log(JSON.stringify(routeNames, null, 2));
  });

  const theme: CustomTheme =
    colorScheme === "dark" ? DarkBlueTheme : DefaultBlueTheme;

  return (
    // https://github.com/expo/expo/issues/27099#issuecomment-1959010092
    // style={{ flex: 1, backgroundColor: theme.colors.background }}
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <CustomThemeProvider>
        <SessionProvider>
          <Stack
            initialRouteName="(auth)/login"
            screenOptions={{
              contentStyle: {
                backgroundColor: theme.colors.background,
              },
              headerShown: false,
              statusBarStyle: "auto",
            }}
          >
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
          <Toast config={toastConfig} />
        </SessionProvider>
      </CustomThemeProvider>
    </View>
  );
}
