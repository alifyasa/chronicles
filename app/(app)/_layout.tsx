import React, { useEffect } from "react";
import { SplashScreen, Stack, router } from "expo-router";
import { View } from "react-native";
import { createDefaultLogger } from "@/utils/logging";
import { authStore, themeStore } from "@/stores";

const logger = createDefaultLogger("APP");
export default function Layout() {
  const theme = themeStore.theme;

  useEffect(() => {
    if (!authStore.isInitDone) return;
    if (!authStore.session) {
      logger.log("Redirect to Root");
      router.replace("/");
      return;
    }
    logger.log("Hiding Splash Screen");
    SplashScreen.hideAsync();
  }, [authStore.session, authStore.isInitDone]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerTintColor: theme.colors.text.normal,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen name="index"></Stack.Screen>
        <Stack.Screen
          name="tests"
          options={{
            title: "Development Tests",
          }}
        ></Stack.Screen>
      </Stack>
    </View>
  );
}
