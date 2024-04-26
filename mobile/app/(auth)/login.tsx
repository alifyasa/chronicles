import { Text, View } from "@/components/Themed";
import { CustomTheme } from "@/constants/Theme";
import { useSession } from "@/providers/AuthProviders";
import { useCustomTheme } from "@/providers/CustomThemeProviders";
import { supabase } from "@/utils/supabase";
import { useNavigation, useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { Redirect } from "expo-router/build/link/Link";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);
  const session = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const logInWithPassword = async () => {
    setIsSigningIn(true);
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsSigningIn(false);
  };

  if (session) {
    return <Redirect href="/(app)/" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.textInputLabel}>E-mail address</Text>
      <TextInput
        autoFocus
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
          <ActivityIndicator style={styles.floatingButtonIndicator} color={styles.floatingButtonText.color} />
        ) : (
          <Text style={styles.floatingButtonText}>Login</Text>
        )}
      </Pressable>
    </SafeAreaView>
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
      color: theme.colors.text,
    },
    textInputLabel: {
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 4,
    },
    textInput: {
      borderWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 5,
      borderColor: theme.colors.border,
      fontSize: 16,
      marginBottom: 16,
    },
    floatingButtonIndicator: {},
    floatingButtonText: {
      color: theme.colors.background,
      textAlign: "center",
      fontSize: 16,
    },
    floatingButton: {
      position: "absolute",
      bottom: 12,
      left: 12,
      height: 48,
      width: "100%",
      padding: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
