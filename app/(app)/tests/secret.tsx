import React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import Crypto from "react-native-aes-crypto";
import Timezone from "react-native-timezone";

import Text from "@/components/themed/Text";
import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { createDefaultLogger } from "@/utils/logging";
import { throttleAsync } from "@/utils/throttle-async";

const logger = createDefaultLogger("APP/DEV/SECRET");
export default function SecretPage() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const [pbkdf2, setPbkdf2] = useState("");
  const [isCalculatingPBKDF2, setIsCalculatingPBKDF2] = useState(false);
  const [password, setPassword] = useState("");
  useEffect(() => {
    setIsCalculatingPBKDF2(true);
    const throttledPBKDF2 = throttleAsync(Crypto.pbkdf2, 500);
    const { promise: pbkdf2Result, cleanUp } = throttledPBKDF2(
      password,
      "salt",
      100000,
      64,
      "sha512",
    );
    pbkdf2Result
      .then((value) => {
        setPbkdf2(value);
        setIsCalculatingPBKDF2(false);
      })
      .catch((err) => logger.debug(err));

    return cleanUp;
  }, [password]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{Timezone.getTimeZone()}</Text>
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
