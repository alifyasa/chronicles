import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { CustomTheme } from "@/constants/themes";
import { useRecord } from "@/providers/DataProvider/Records/RecordProvider";
import { Record } from "@/utils/supabase/records/schema";
import Text from "@/components/themed/Text";

export default function RecordsTab() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const { allRecords, fetchAllRecords, isFetchingAllRecords } = useRecord();
  useFocusEffect(fetchAllRecords);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          paddingBottom:
            styles.floatingButtonContainer.height +
            2 * styles.floatingButtonContainer.bottom,
          flexGrow: 1,
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Records Yet</Text>
            </View>
          );
        }}
        data={allRecords}
        renderItem={({ item: record }) => DisplayRecord(record, theme)}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingAllRecords}
            onRefresh={fetchAllRecords}
          />
        }
      ></FlatList>
      <Pressable
        style={({ pressed }) => [
          styles.floatingButtonContainer,
          {
            elevation: pressed ? 2 : 4,
          },
        ]}
        onPress={() => {
          router.push("/(app)/record/create");
        }}
      >
        <FontAwesome6 name="plus" size={32} style={styles.floatingButtonIcon} />
      </Pressable>
    </View>
  );
}

function DisplayRecord(record: Record, theme: CustomTheme) {
  const styles = stylesFromTheme(theme);
  return (
    <Pressable
      key={record.record_id}
      onPress={() => router.push(`/(app)/record/entries/${record.record_id}`)}
      style={({ pressed }) => [
        styles.displayRecordContainer,
        {
          backgroundColor: pressed
            ? theme.colors.pressable.pressed
            : theme.colors.pressable.normal,
        },
      ]}
    >
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.displayRecordText}
      >
        {record.name}
      </Text>
      <Text
        numberOfLines={5}
        ellipsizeMode="tail"
        style={{
          fontSize: 14,
          fontStyle: record.description ? "normal" : "italic",
          color: record.description
            ? theme.colors.text.normal
            : theme.colors.text.dim,
        }}
      >
        {record.description ?? "No Description"}
      </Text>
    </Pressable>
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
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    floatingButtonContainer: {
      position: "absolute",
      bottom: 12,
      right: 12,
      marginBottom: 8,
      marginRight: 8,
      borderRadius: 90,
      width: 52,
      height: 52,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.pressable.normal,
    },
    floatingButtonIcon: {
      color: theme.colors.text.normal,
      margin: "auto",
    },
    displayRecordContainer: {
      padding: 16,
      borderRadius: 5,
      maxHeight: 256,
    },
    displayRecordText: {
      color: theme.colors.text.normal,
      fontSize: 18,
      fontWeight: "500",
      marginBottom: 8,
    },
  });
