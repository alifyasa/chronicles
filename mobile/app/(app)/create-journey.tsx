import { CustomTheme } from "@/constants/Theme";
import { useCustomTheme } from "@/providers/CustomThemeProviders";
import { supabase } from "@/utils/supabase";
import { Theme, useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateJourneyScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const [journeyName, setJourneyName] = useState("");
  const [journeyDescription, setJourneyDescription] = useState("");
  const [isCreatingJourney, setIsCreatingJourney] = useState(false);
  const createJourneyCallback = useCallback(() => {
    async function createJourney() {
      setIsCreatingJourney(true);
      let { error } = await supabase.rpc("create_journey", {
        // if empty, replace with null
        journey_name: journeyName.trim() || null,
        journey_description: journeyDescription.trim() || null,
      });
      if (!error) {
        router.back();
      }
      setIsCreatingJourney(false);
    }
    createJourney();
  }, [journeyName, journeyDescription]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start a New Journey</Text>
      <ScrollView>
        <Text style={styles.textInputLabel}>
          Name (
          <Text
            style={{
              color: journeyName.length < 3 ? theme.custom.palette.errorRed : theme.colors.text,
            }}
          >
            {journeyName.length}
          </Text>
          /100)
        </Text>
        <TextInput
          autoFocus
          placeholder="Insert name here (required)"
          ref={(input) => (inputRefs.current[0] = input)}
          onSubmitEditing={() => focusNextInput(0)}
          style={styles.textInput}
          value={journeyName}
          onChangeText={setJourneyName}
          maxLength={100}
        />
        <Text style={styles.textInputLabel}>
          Description ({journeyDescription.length}/4000)
        </Text>
        <TextInput
          multiline
          scrollEnabled
          placeholder="Insert description here (optional)"
          ref={(input) => (inputRefs.current[1] = input)}
          value={journeyDescription}
          onChangeText={setJourneyDescription}
          maxLength={4000}
          style={styles.textInput}
        />
      </ScrollView>
      <Pressable
        style={styles.floatingButton}
        onPress={createJourneyCallback}
        disabled={isCreatingJourney}
      >
        {isCreatingJourney ? (
          <ActivityIndicator
            style={styles.floatingButtonIndicator}
            color={theme.colors.background}
          />
        ) : (
          <Text style={styles.floatingButtonText}>Create</Text>
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
    title: {
      fontSize: 24,
      fontWeight: "500",
      marginTop: 4,
      marginBottom: 16,
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
      maxHeight: 100 + 16,
      overflow: "scroll",
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
