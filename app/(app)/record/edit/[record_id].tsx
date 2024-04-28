import React from "react";
import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { useRecord } from "@/providers/DataProvider/Records/RecordProvider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import Text from "@/components/themed/Text";

export default function RecordDetailScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);

  const { record_id: recordId }: { record_id: string } = useLocalSearchParams();
  const { recordKV } = useRecord();

  const navigation = useNavigation();
  useFocusEffect(() => {
    navigation.setOptions({
      title: `Edit ${recordKV[recordId].name}`,
    });
  });
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text.normal }}>
        Edit Record Screen
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
