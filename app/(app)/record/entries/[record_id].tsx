import React, { useCallback, useEffect, useRef, useState } from "react";
import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { useRecord } from "@/providers/DataProvider/Records/RecordProvider";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TextInput as RNTextInput,
} from "react-native";
import Text from "@/components/themed/Text";
import TextInput from "@/components/themed/TextInput";
import Toast from "react-native-toast-message";
import { DateTime } from "luxon";
import { RecordEntry } from "@/utils/supabase/records/schema";

export default function RecordDetailScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const { record_id: recordId }: { record_id: string } = useLocalSearchParams();
  const {
    allRecordsKV,
    fetchAllRecords,
    addRecordEntry,
    isAddingRecordEntry,
    recordEntriesByRecordId,
    fetchRecordEntriesById,
    isFetchingRecordEntries,
  } = useRecord();
  const chatRef = useRef<RNTextInput | null>(null);

  const [message, setMessage] = useState("");
  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (!allRecordsKV[recordId]) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Record not Found",
      });
      router.back();
    }
  }, []);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: allRecordsKV[recordId].name,
      headerRight: () => (
        <Pressable
          style={{ marginRight: 8 }}
          onPress={() => router.push(`/(app)/record/edit/${recordId}`)}
        >
          <FontAwesome6 name="pen" size={20} color={theme.colors.text.normal} />
        </Pressable>
      ),
    });
  }, [allRecordsKV[recordId].name]);

  useEffect(() => {
    if (!isAddingRecordEntry) {
      fetchRecordEntriesById(recordId);
    }
  }, [isAddingRecordEntry]);

  const sendMessage = useCallback(() => {
    addRecordEntry(recordId, message)
      .then((success) => {
        if (!success) {
          return;
        }
        chatRef.current?.clear();
        return;
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: JSON.stringify(err),
        });
      });
  }, [recordId, message]);
  return (
    <View style={styles.container}>
      <FlatList
        refreshing={isFetchingRecordEntries}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingRecordEntries}
            onRefresh={() => {
              fetchRecordEntriesById(recordId);
              fetchAllRecords();
            }}
          />
        }
        inverted
        ref={(ref) => (flatListRef.current = ref)}
        data={recordEntriesByRecordId[recordId]}
        keyExtractor={(item) => item.entry_id}
        contentContainerStyle={{
          gap: 12,
          flexGrow: 1,
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                transform: [{ scale: -1 }],
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Message in this Record</Text>
            </View>
          );
        }}
        renderItem={({ item: recordEntry }) => (
          <RenderRecordEntry recordEntry={recordEntry} />
        )}
      />
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          alignItems: "flex-end",
          marginTop: 12,
        }}
      >
        <TextInput
          ref={(ref) => (chatRef.current = ref)}
          textAlignVertical="bottom"
          multiline
          scrollEnabled
          placeholder="Type something here..."
          maxLength={400}
          placeholderTextColor={theme.colors.text.dim}
          value={message}
          onChangeText={(newText) => setMessage(newText.replace("\n", ""))}
          onKeyPress={({ nativeEvent: { key } }) => {
            if (key === "Enter") {
              sendMessage();
            }
          }}
        />
        <Pressable style={styles.sendIconContainer} onPress={sendMessage}>
          {isAddingRecordEntry ? (
            <ActivityIndicator size={23} color={theme.colors.text.normal} />
          ) : (
            <FontAwesome6
              name="paper-plane"
              size={23}
              color={theme.colors.text.normal}
              style={styles.sendIcon}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const RenderRecordEntry = (props: { recordEntry: RecordEntry }) => {
  const theme = useCustomTheme();
  return (
    <View
      style={{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.border,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          padding: 12,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border,
          fontSize: 14,
          color: theme.colors.text.dim,
        }}
      >
        {props.recordEntry.created_at.toLocaleString(DateTime.DATETIME_FULL)}
      </Text>
      <Text
        style={{
          padding: 12,
        }}
      >
        {props.recordEntry.message}
      </Text>
    </View>
  );
};

const stylesFromTheme = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 12,
    },
    sendIconContainer: {
      borderRadius: 90,
      flex: 0,
      width: 46,
      height: 46,
      marginLeft: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.pressable.normal,
    },
    sendIcon: {
      position: "relative",
      right: 2,
    },
  });
