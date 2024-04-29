import React, { useCallback, useEffect, useRef, useState } from "react";
import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { useRecord } from "@/providers/DataProvider/Records/RecordProvider";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  StyleSheet,
  View,
  TextInput as RNTextInput,
  ActivityIndicator,
  FlatList,
  RefreshControl,
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
    addRecordEntry,
    isAddingRecordEntry,
    recordEntriesByRecordId,
    fetchRecordEntriesById,
    isFetchingRecordEntries,
  } = useRecord();
  const chatRef = useRef<RNTextInput | null>(null);

  const [message, setMessage] = useState("");
  const flatListRef = useRef<FlatList | null>(null);

  const navigation = useNavigation();
  useFocusEffect(() => {
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
  });

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
        setMessage("");
        chatRef.current?.blur();
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
            onRefresh={() => fetchRecordEntriesById(recordId)}
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
          multiline
          scrollEnabled
          placeholder="Type something here..."
          maxLength={400}
          placeholderTextColor={theme.colors.text.dim}
          value={message}
          onChangeText={setMessage}
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
