import React from "react";
import { Tabs } from "expo-router";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { FontAwesome6 } from "@expo/vector-icons";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { View } from "react-native";

export default function TabLayout() {
  const theme = useCustomTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Tabs
        screenOptions={{
          headerShown: useClientOnlyValue(false, true),
          headerTintColor: theme.colors.text.normal,
          headerStyle: {
            backgroundColor: theme.colors.background,
            shadowColor: theme.colors.text.normal,
          },

          tabBarActiveTintColor: theme.colors.text.normal,
          tabBarActiveBackgroundColor: theme.colors.background,
          tabBarInactiveBackgroundColor: theme.colors.background,

          tabBarIconStyle: {
            marginBottom: -8,
          },
          tabBarLabelStyle: {
            marginBottom: 8,
          },
          tabBarStyle: {
            // Spent too much time debugging this
            backgroundColor: "transparent",
            borderTopColor: "transparent",
            shadowColor: theme.colors.text.normal,
            height: 64,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Records",
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome6 name="folder-open" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome6 name="gear" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
