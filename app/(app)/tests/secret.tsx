import Crypto from "react-native-aes-crypto";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useCustomTheme } from "@/providers/CustomThemeProviders";
import { CustomTheme } from "@/constants/themes";
import { debounce, throttle } from "lodash";

export default function SecretPage() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const [pbkdf2, setPbkdf2] = useState("");
  const [isCalculatingPBKDF2, setIsCalculatingPBKDF2] = useState(false);
  const [password, setPassword] = useState("");
  useEffect(() => {
    // Truely Throttled
    setIsCalculatingPBKDF2(true);
    const abortSignal = new AbortController();
    const timeout = setTimeout(() => {
      console.log(`[PBKDF2] [START] "${password}"`);
      const doSomething: Promise<string> = new Promise((resolve, reject) => {
        function abortListener() {
          abortSignal.signal.removeEventListener("abort", abortListener);
          reject(`[PBKDF2] [ABORT] "${password}"`);
        }
        abortSignal.signal.addEventListener("abort", abortListener);
        Crypto.pbkdf2(password, "salt", 100000, 64, "sha512")
          .then(resolve)
          .catch(reject);
      });
      doSomething
        .then((value) => {
          console.log(`[PBKDF2] [DONE ] "${password}"`);
          setPbkdf2(value);
          setIsCalculatingPBKDF2(false); // Turn off loading state after calculation
        })
        .catch((err) => console.log(err));
    });
    return () => {
      abortSignal.abort();
      clearTimeout(timeout);
    };
  }, [password]);

  return (
    <View style={styles.container}>
      <View>
        {isCalculatingPBKDF2 ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>{pbkdf2}</Text>
        )}
      </View>
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={setPassword}
      />
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
    text: {
      color: theme.colors.text.normal,
    },
    textInput: {
      borderColor: theme.colors.border,
      borderWidth: StyleSheet.hairlineWidth,
      color: theme.colors.text.normal,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
  });
