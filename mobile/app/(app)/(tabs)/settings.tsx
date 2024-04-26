import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Theme, useTheme } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useCustomTheme } from "@/providers/CustomThemeProviders";
import { CustomTheme } from "@/constants/Theme";

export default function SettingsScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logOutCallback = useCallback(() => {
    async function logOut() {
      setIsLoggingOut(true);
      let { error } = await supabase.auth.signOut();
      setIsLoggingOut(false);
    }
    logOut();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.floatingButton}
        onPress={logOutCallback}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <ActivityIndicator
            style={styles.floatingButtonIndicator}
            color={theme.colors.background}
          />
        ) : (
          <Text style={styles.floatingButtonText}>Log Out</Text>
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
    },
    floatingButtonIndicator: {},
    floatingButtonText: {
      color: theme.colors.background,
      textAlign: "center",
      fontSize: 16,
    },
    floatingButton: {
      height: 48,
      width: "100%",
      padding: 12,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: theme.custom.palette.errorRed,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
