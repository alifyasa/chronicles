import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { Theme, useFocusEffect, useTheme } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCustomTheme } from "@/providers/CustomThemeProviders";
import { CustomTheme } from "@/constants/Theme";
import { useRecord } from "@/providers/RecordProviders";
import { Record } from "@/utils/supabase/types";

export default function RecordListScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const { record, isFetchingRecord, fetchRecord: fetchRecord } = useRecord();
  useFocusEffect(fetchRecord);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          paddingBottom:
            styles.floatingButtonContainer.height +
            2 * styles.floatingButtonContainer.bottom,
        }}
        data={record}
        renderItem={({ item: record }) => DisplayRecord(record, theme)}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingRecord}
            onRefresh={fetchRecord}
          />
        }
      ></FlatList>
      <Pressable
        style={styles.floatingButtonContainer}
        onPress={() => router.push("/(app)/create-record")}
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
      onPress={() => router.push(`/(app)/record/${record.record_id}`)}
      style={({ pressed }) => [
        styles.displayRecordContainer,
        {
          backgroundColor: pressed
            ? theme.colors.border
            : theme.colors.background,
        },
      ]}
    >
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{ fontSize: 18, fontWeight: "500", marginBottom: 8 }}
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
            ? theme.colors.text
            : theme.custom.palette.textDim,
        }}
      >
        {record.description ?? "No Description"}
      </Text>
    </Pressable>
  );
}

const stylesFromTheme = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
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
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 90,
      width: 52,
      height: 52,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: `rgba(255, 255, 255, 0.9)`,
    },
    floatingButtonIcon: {
      color: theme.colors.text,
      margin: "auto",
    },
    displayRecordContainer: {
      padding: 16,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.border,
      maxHeight: 256,
    },
  });
