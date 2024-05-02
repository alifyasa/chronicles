import { router, SplashScreen, Stack } from "expo-router";
import { autorun } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { View } from "react-native";

import { RecordProvider } from "@/providers/DataProvider/Records/RecordProvider";
import { authStore, themeStore } from "@/stores";
import { createDefaultLogger } from "@/utils/logging";

const logger = createDefaultLogger("APP");
const Layout = () => {
  const theme = themeStore.theme;
  useEffect(() => {
    autorun((r) => {
      r.trace();
      if (!authStore.isInitDone) return;
      if (!authStore.session) {
        logger.log("Redirect to Root");
        router.replace("/");
        return;
      }
      logger.log("Hiding Splash Screen");
      SplashScreen.hideAsync();
    });
  }, []);

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
};

export default observer(Layout);
