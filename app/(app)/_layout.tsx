import React, { useEffect } from "react";
import { useSession } from "@/providers/AuthProvider";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { RecordProvider } from "@/providers/DataProvider/Records/RecordProvider";
import { SplashScreen, Stack, router } from "expo-router";
import { View } from "react-native";
import { createDefaultLogger } from "@/utils/logging";

const logger = createDefaultLogger("APP");
export default function Layout() {
  const { session, isInitDone } = useSession();
  const theme = useCustomTheme();

  useEffect(() => {
    if (!isInitDone) return;
    if (!session) {
      logger.log("Redirect to Root");
      router.replace("/");
      return;
    }
    logger.log("Hiding Splash Screen");
    SplashScreen.hideAsync();
  }, [session, isInitDone]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <RecordProvider>
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
      </RecordProvider>
    </View>
  );
}
