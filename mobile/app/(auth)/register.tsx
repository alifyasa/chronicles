import { Text, View } from "@/components/Themed";
import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { Button, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const sendMagicLink = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
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
        }}
      >
        register
      </Text>
      <Text style={{ marginBottom: 4, fontSize: 16 }}>e-mail address</Text>
      <TextInput
        inputMode="email"
        autoCapitalize="none"
        cursorColor="black"
        autoFocus
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "black",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 5,
          marginTop: 4,
          fontSize: 18,
          lineHeight: 1,
        }}
      />
      <Text style={{ marginBottom: 4, fontSize: 16 }}>password</Text>
      <TextInput
        inputMode="text"
        secureTextEntry
        autoCapitalize="none"
        cursorColor="black"
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "black",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 5,
          marginTop: 4,
          fontSize: 18,
          lineHeight: 1,
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
          onPress={sendMagicLink}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 8,
            backgroundColor: "black",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Send Magic Link
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
