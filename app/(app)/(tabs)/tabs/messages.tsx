import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import React from "react";
import { useCallback, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { CustomTheme } from "@/constants/themes";
import { router, useFocusEffect } from "expo-router";
import Text from "@/components/themed/Text";

export default function MessagesTab() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logOutCallback = useCallback(() => {
    async function logOut() {
      setIsLoggingOut(true);
      // Returns { error }
      await supabase.auth.signOut();
      setIsLoggingOut(false);
    }
    logOut();
  }, []);
  useFocusEffect(() => {
    console.log("Messages");
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed
              ? theme.colors.pressable.pressed
              : theme.colors.pressable.normal,
            marginBottom: 12,
          },
        ]}
        onPress={() => router.push("/tests/secret")}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: theme.dark
                ? theme.colors.dangerousPressable.text
                : theme.colors.text.normal,
            },
          ]}
        >
          Go to Secret Page
        </Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={logOutCallback}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <ActivityIndicator
            style={styles.buttonIndicator}
            color={styles.buttonText.color}
          />
        ) : (
          <Text style={styles.buttonText}>Log Out</Text>
        )}
      </Pressable>
    </View>
  );
}

const stylesFromTheme = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: theme.colors.background,
    },
    buttonIndicator: {},
    buttonText: {
      color: theme.colors.dangerousPressable.text,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "500",
    },
    button: {
      height: 48,
      width: "100%",
      padding: 12,
      borderRadius: 5,
      backgroundColor: theme.colors.dangerousPressable.background.normal,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
