import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React from "react";
import { useCallback, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useCustomTheme } from "@/providers/CustomThemeProviders";
import { CustomTheme } from "@/constants/themes";

export default function SettingsScreen() {
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

  return (
    <View style={styles.container}>
      {/* <Modal
        transparent
      >
        <Text style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'red'
        }}>Log Out Modal</Text>
      </Modal> */}
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
