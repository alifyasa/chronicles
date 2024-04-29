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
} from "react-native";
import Text from "@/components/themed/Text";
import TextInput from "@/components/themed/TextInput";
import Toast from "react-native-toast-message";

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
  } = useRecord();
  const chatRef = useRef<RNTextInput | null>(null);

  const [message, setMessage] = useState("");

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
      {/* <ScrollView
        style={{
          flex: 1,
        }}
      > */}
      <FlatList
        data={recordEntriesByRecordId[recordId]}
        renderItem={(item) => {
          return (
            <View>
              <Text>{item.item.message}</Text>
            </View>
          );
        }}
      />
      {/* </ScrollView> */}
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          alignItems: "flex-end",
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
