import React from "react";
import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { useRecord } from "@/providers/DataProvider/Records/RecordProvider";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import Toast from "react-native-toast-message";
import Text from "@/components/themed/Text";

// const logger = createDefaultLogger("APP/RECORD/CREATE");
export default function CreateRecordScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);
  const { isAddingRecord, addRecord } = useRecord();

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const [recordName, setRecordName] = useState("");
  const [recordDescription, setRecordDescription] = useState("");
  const createRecordCallback = useCallback(() => {
    addRecord(recordName, recordDescription, "GENERAL")
      .then((success) => {
        if (!success) {
          return;
        }
        return router.back();
      })
      .catch((err) => {
        if (err instanceof z.ZodError) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: err.issues[0].message,
          });
          return;
        }
        Toast.show({
          type: "error",
          text1: "Error",
          text2: err,
        });
      });
  }, [recordName, recordDescription]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Record</Text>
      <ScrollView>
        <Text style={styles.textInputLabel}>
          Name (
          <Text
            style={{
              color:
                recordName.length < 3
                  ? theme.colors.text.error
                  : theme.colors.text.normal,
            }}
          >
            {recordName.length}
          </Text>
          /100)
        </Text>
        <TextInput
          autoFocus
          placeholder="Insert name here (required)"
          ref={(input) => (inputRefs.current[0] = input)}
          onSubmitEditing={() => focusNextInput(0)}
          style={styles.textInput}
          value={recordName}
          onChangeText={setRecordName}
          maxLength={100}
          placeholderTextColor={theme.colors.text.dim}
        />
        <Text style={styles.textInputLabel}>
          Description ({recordDescription.length}/4000)
        </Text>
        <TextInput
          multiline
          scrollEnabled
          placeholder="Insert description here (optional)"
          ref={(input) => (inputRefs.current[1] = input)}
          value={recordDescription}
          onChangeText={setRecordDescription}
          maxLength={4000}
          style={styles.textInput}
          placeholderTextColor={theme.colors.text.dim}
        />
      </ScrollView>
      <Pressable
        style={styles.floatingButton}
        onPress={createRecordCallback}
        disabled={isAddingRecord}
      >
        {isAddingRecord ? (
          <ActivityIndicator
            style={styles.floatingButtonIndicator}
            color={theme.colors.text.normal}
          />
        ) : (
          <Text style={styles.floatingButtonText}>Create Record</Text>
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
      maxHeight: 100 + 16,
      overflow: "scroll",
      marginBottom: 16,
      color: theme.colors.text.normal,
    },
    floatingButtonIndicator: {},
    floatingButtonText: {
      color: theme.colors.text.normal,
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
      borderRadius: 5,
      backgroundColor: theme.colors.pressable.normal,
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
