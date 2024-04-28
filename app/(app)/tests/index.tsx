import Text from "@/components/themed/Text";
import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Timezone from "react-native-timezone";

export default function TestScreen() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Development Features</Text>
      <Text style={styles.heading}>System Information</Text>
      <View style={styles.systemInformationContainer}>
        <View style={[styles.systemInformationColumn, { flex: 1 / 3 }]}>
          <View style={styles.systemInformationRow}>
            <Text>Timezone</Text>
          </View>
          <View style={styles.systemInformationRow}>
            <Text>Locale</Text>
          </View>
          <View style={styles.systemInformationRow}>
            <Text>Telephony</Text>
          </View>
        </View>
        <View style={[styles.systemInformationColumn, { flex: 2 / 3 }]}>
          <View style={styles.systemInformationRow}>
            <Text>{Timezone.getTimeZone()}</Text>
          </View>
          <View style={styles.systemInformationRow}>
            <Text>{Timezone.getRegionByLocale()}</Text>
          </View>
          <View style={styles.systemInformationRow}>
            <Text>{Timezone.getRegionByTelephony()}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.heading}>Bleeding New Features</Text>
      <Link href="/tests/viewpager">
        <Text>ViewPager</Text>
      </Link>
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
    title: {
      color: theme.colors.text.normal,
      fontSize: 24,
      fontWeight: "500",
      marginBottom: 24,
    },
    heading: {
      color: theme.colors.text.normal,
      fontSize: 20,
      fontWeight: "500",
      marginBottom: 16,
    },
    systemInformationContainer: {
      flexDirection: "row",
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 16,
    },
    systemInformationColumn: {
      flexDirection: "column",
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: theme.colors.border,
    },
    systemInformationRow: {
      padding: 8,
      fontSize: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
    },
  });
