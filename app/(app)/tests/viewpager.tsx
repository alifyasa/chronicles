import React, { memo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import { BottomNavigation, Divider } from "react-native-paper";

import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";

import MessagesTab from "../tabs/messages";
import RecordsTab from "../tabs/records";
import SettingsTab from "../tabs/settings";

/**
 * Ada dua bagian:
 *  1. PagerView
 *  2. BottomNavigation.Bar
 *
 * State:
 *  1. pageIndex
 *  2. pagerViewRef
 *
 * Functions:
 *  1. Set BottomNavigation.Bar Index
 *  2. Set PagerView Index
 *
 * Tab:
 *  1. Name
 *  2. Icon
 *
 * Komponen lebih baik di-hardcode dan tidak menggunakan loop agar hooksnya
 * aman.
 *
 *  > Only call Hooks at the top level – Don’t call Hooks inside loops,
 *  > conditions, or nested functions. Instead, always use Hooks at
 *  > the top level of your React function, before any early returns.
 *
 * Untuk set page kedua komponen membutuhkan page index,
 * tetapi BottomNavigation.Bar hanya memberi key sehingga perlu
 * translate key => index
 */

interface TabbedProps {
  setPageIndex: (newIndex: number) => void;
}
const TabPages = memo(function TabPages({
  setPageIndex: setIndex,
}: TabbedProps) {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);
  const pagerViewRef = useRef<PagerView | null>(null);
  return (
    <PagerView
      ref={(ref) => (pagerViewRef.current = ref)}
      style={styles.container}
      initialPage={1}
      onPageSelected={(page) => {
        console.log(JSON.stringify(page.nativeEvent.position, null, 2));
        setIndex(page.nativeEvent.position);
        pagerViewRef.current?.setPage(page.nativeEvent.position);
      }}
    >
      <View style={styles.page} key={0}>
        <MessagesTab />
      </View>
      <View style={styles.page} key={1}>
        <RecordsTab />
      </View>
      <View style={styles.page} key={2}>
        <SettingsTab />
      </View>
    </PagerView>
  );
});

export default function ViewPagerTest() {
  const theme = useCustomTheme();
  const styles = stylesFromTheme(theme);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "msg",
      title: "Messages",
    },
    {
      key: "rcrd",
      title: "Records",
    },
    {
      key: "settings",
      title: "Settings",
    },
  ]);

  return (
    <View style={styles.container}>
      <TabPages setPageIndex={setIndex} />
      <Divider />
      <BottomNavigation.Bar
        activeColor={theme.colors.text.normal}
        inactiveColor={theme.colors.text.dim}
        activeIndicatorStyle={{
          backgroundColor: theme.colors.pressable.pressed,
        }}
        style={{
          backgroundColor: theme.colors.background,
        }}
        navigationState={{ index, routes }}
        onTabPress={(all) => {
          console.log(JSON.stringify(all));
        }}
      />
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stylesFromTheme = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    page: {},
  });
