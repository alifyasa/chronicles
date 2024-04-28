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
        initialRouteName="records"
        backBehavior="initialRoute"
        screenOptions={() => ({
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
            // elevation: navigation.isFocused() ? 8 : 0,
          },
        })}
      >
        {/* To be able to render, we NEED index.tsx. 
            I don't want this, so I redirect index to initial route
            then I hide index.tsx
            */}
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome6 name="paper-plane" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="records"
          options={{
            title: "Records",
            tabBarIcon: ({ color }: { color: string }) => (
              <FontAwesome6 name="database" size={28} color={color} />
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
