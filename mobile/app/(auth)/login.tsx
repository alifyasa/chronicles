import { Text, View } from "@/components/Themed";
import { useSession } from "@/providers/AuthProviders";
import { supabase } from "@/utils/supabase";
import { useNavigation, useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { Redirect } from "expo-router/build/link/Link";
import { useState } from "react";
import { ActivityIndicator, Button, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const theme = useTheme();
  const session = useSession()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const sendMagicLink = async () => {
    setIsSigningIn(true);
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsSigningIn(false);
  };

  if(session) {
    return <Redirect href="/(app)/" />
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        height: "100%",
        paddingTop: 8,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          paddingBottom: 16,
          color: theme.colors.text,
        }}
      >
        Login
      </Text>
      <Text style={{ marginBottom: 4, fontSize: 16 }}>e-mail address</Text>
      <TextInput
        autoFocus
        inputMode="email"
        autoCapitalize="none"
        cursorColor={theme.colors.primary}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 5,
          marginTop: 4,
          fontSize: 18,
          lineHeight: 1,
          color: theme.colors.text,
        }}
      />
      <Text style={{ marginBottom: 4, fontSize: 16 }}>password</Text>
      <TextInput
        inputMode="text"
        secureTextEntry
        autoCapitalize="none"
        cursorColor={theme.colors.primary}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 5,
          marginTop: 4,
          fontSize: 18,
          lineHeight: 1,
          color: theme.colors.text,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 16,
          marginBottom: 16,
          flex: 1,
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Pressable
          disabled={isSigningIn}
          onPress={sendMagicLink}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 8,
            borderColor: theme.colors.border,
          }}
        >
          {isSigningIn ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
