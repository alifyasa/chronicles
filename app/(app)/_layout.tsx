import React from "react";
import { useSession } from "@/providers/AuthProvider";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { RecordProvider } from "@/providers/DataProvider/Records/RecordProvider";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  const { session, isInitDone } = useSession();
  const theme = useCustomTheme();

  if (!session && isInitDone) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <RecordProvider>
        <Stack
          initialRouteName="tabs"
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
          <Stack.Screen
            name="tabs"
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
