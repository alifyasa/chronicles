import React, { useEffect, useRef } from "react";
import { CustomTheme } from "@/constants/themes";
import { useSession } from "@/providers/AuthProvider";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import Text from "@/components/themed/Text";
import { createDefaultLogger } from "@/utils/logging";

const logger = createDefaultLogger("AUTH");
export default function LoginScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);
  const { session, isInitDone } = useSession();
  const ref = useRef<TextInput | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const logInWithPassword = async () => {
    setIsSigningIn(true);
    // Returns { error }
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsSigningIn(false);
  };

  useFocusEffect(() => {
    ref?.current?.focus();
  });

  useEffect(() => {
    if (session && isInitDone) {
      logger.log("Redirect to App");
      router.replace("/(app)/");
    }
  }, [session, isInitDone]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.textInputLabel}>E-mail address</Text>
      <TextInput
        ref={(input) => (ref.current = input)}
        inputMode="email"
        autoCapitalize="none"
        onChangeText={setEmail}
        style={styles.textInput}
      />
      <Text style={styles.textInputLabel}>Password</Text>
      <TextInput
        inputMode="text"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <Pressable
        disabled={isSigningIn}
        onPress={logInWithPassword}
        style={styles.floatingButton}
      >
        {isSigningIn ? (
          <ActivityIndicator
            style={styles.floatingButtonIndicator}
            color={styles.floatingButtonText.color}
          />
        ) : (
          <Text style={styles.floatingButtonText}>Login</Text>
        )}
      </Pressable>
    </View>
  );
}

const stylesFromTheme = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      paddingTop: 8,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      paddingBottom: 16,
      color: theme.colors.text.normal,
    },
    textInputLabel: {
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 4,
      color: theme.colors.text.normal,
    },
    textInput: {
      borderWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 5,
      borderColor: theme.colors.border,
      fontSize: 16,
      marginBottom: 16,
      color: theme.colors.text.normal,
    },
    floatingButtonIndicator: {},
    floatingButtonText: {
      color: theme.colors.text.normal,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "500",
    },
    floatingButton: {
      position: "absolute",
      bottom: 12,
      left: 12,
      height: 48,
      width: "100%",
      padding: 12,
      borderRadius: 5,
      backgroundColor: theme.colors.pressable.normal,
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
