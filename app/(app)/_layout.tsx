import React from "react";
import { useSession } from "@/providers/AuthProviders";
import { useCustomTheme } from "@/providers/CustomThemeProviders";
import { RecordProvider } from "@/providers/RecordProviders";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  const session = useSession();
  const theme = useCustomTheme();

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <RecordProvider>
        <Stack
          screenOptions={{
            headerTintColor: theme.colors.text.normal,
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
            statusBarStyle: "auto",
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="create-record"
            options={{
              title: "Create Record",
            }}
          ></Stack.Screen>
        </Stack>
      </RecordProvider>
    </View>
  );
}
