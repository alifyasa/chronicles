import React from "react";
import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { useRecord } from "@/providers/DataProvider/Records/RecordProvider";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "@/components/themed/Text";

export default function RecordDetailScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const { record_id: recordId }: { record_id: string } = useLocalSearchParams();
  const { recordKV } = useRecord();

  const navigation = useNavigation();
  useFocusEffect(() => {
    navigation.setOptions({
      title: recordKV[recordId].name,
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
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text.normal }}>
        {recordKV[recordId].record_id}
      </Text>
      <Text style={{ color: theme.colors.text.normal }}>
        {recordKV[recordId].name}
      </Text>
      <Text style={{ color: theme.colors.text.normal }}>
        {recordKV[recordId].type}
      </Text>
      <Text style={{ color: theme.colors.text.normal }}>
        {recordKV[recordId].created_at.toString()}
      </Text>
      <Text style={{ color: theme.colors.text.normal }}>
        {recordKV[recordId].description}
      </Text>
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
  });
