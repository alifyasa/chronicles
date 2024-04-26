import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable, View, ViewStyle } from "react-native";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { FontAwesome6 } from "@expo/vector-icons";
import { useCustomTheme } from "@/providers/CustomThemeProviders";

export default function TabLayout() {
  const theme = useCustomTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          headerTintColor: theme.colors.text,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },

          tabBarActiveTintColor: theme.colors.text,
          tabBarActiveBackgroundColor: theme.colors.background,
          tabBarInactiveBackgroundColor: theme.colors.background,

          tabBarIconStyle: {
            marginBottom: -8
          },
          tabBarLabelStyle: {
            marginBottom: 8
          },
          tabBarStyle: {
              // Spent too much time debugging this
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.background,
              height: 64,
          }
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
