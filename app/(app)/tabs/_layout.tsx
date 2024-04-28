import React from "react";
import { Stack } from "expo-router";

import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { View } from "react-native";

export default function TabLayout() {
  const theme = useCustomTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack
        initialRouteName="index"
        screenOptions={{
          title: "",
          headerTintColor: theme.colors.text.normal,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          navigationBarColor: theme.colors.background,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
