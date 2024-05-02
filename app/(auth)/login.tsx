import { router, useFocusEffect } from "expo-router";
import { SplashScreen } from "expo-router";
import { autorun, trace } from "mobx";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import Text from "@/components/themed/Text";
import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { authStore } from "@/stores";
import { createDefaultLogger } from "@/utils/logging";
import { supabase } from "@/utils/supabase";

const logger = createDefaultLogger("AUTH");
const LoginScreen = () => {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);
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

  trace(authStore, "isInitDone");
  trace(authStore, "session");
  useEffect(() => {
    autorun((reaction) => {
      reaction.trace();
      if (!authStore.isInitDone) {
        logger.log("Init Not Done");
        return;
      }

      if (authStore.session) {
        logger.log("Redirect to App");
        router.replace("/(app)/");
        return;
      }

      logger.log("Hiding Splash Screen");
      SplashScreen.hideAsync();
    });
  }, []);

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
};

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

export default LoginScreen;
