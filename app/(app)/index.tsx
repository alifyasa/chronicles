import PagerView from "react-native-pager-view";
import React, { memo, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { CustomTheme } from "@/constants/themes";
import { BottomNavigation, Divider } from "react-native-paper";
import MessagesTab from "./tabs/messages";
import SettingsTab from "./tabs/settings";
import RecordsTab from "./tabs/records";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { themeStore } from "@/stores";
import { observer } from "mobx-react";

const INITIAL_PAGE_INDEX = 1;
const TABS = [
  {
    key: "messages",
    title: "Messages",
  },
  {
    key: "records",
    title: "Records",
  },
  {
    key: "settings",
    title: "Settings",
  },
];
const TAB_ICONS: { [key: string]: string } = {
  messages: "paper-plane",
  records: "box-archive",
  settings: "gear",
};

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

interface TabPagesProps {
  setPageIndex: (newIndex: number) => void;
  pagerViewRef: React.MutableRefObject<PagerView | null>;
}
const TabPages = observer(
  memo(function TabPages(props: TabPagesProps) {
    const theme = themeStore.theme;
    const styles = stylesFromTheme(theme);
    const { setPageIndex, pagerViewRef } = props;

    return (
      <PagerView
        ref={(ref) => (pagerViewRef.current = ref)}
        style={styles.container}
        initialPage={1}
        onPageSelected={(page) => {
          // console.log(JSON.stringify(page.nativeEvent.position, null, 2));
          setPageIndex(page.nativeEvent.position);
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
  })
);

const RenderIcon = observer((props: { iconName: string }) => {
  const theme = themeStore.theme;
  return (
    <FontAwesome6
      size={24}
      name={props.iconName}
      color={theme.colors.text.normal}
    />
  );
});

const HomeTab = () => {
  const theme = themeStore.theme;
  const navigation = useNavigation();
  const styles = stylesFromTheme(theme);

  const pagerViewRef = useRef<PagerView | null>(null);
  const [pageIndex, setPageIndex] = React.useState(INITIAL_PAGE_INDEX);
  const [routes] = React.useState(TABS);
  const setPageIndexCallback = useCallback(
    (newPageIndex: number, setTabPage = false) => {
      if (setTabPage) {
        pagerViewRef.current?.setPage(newPageIndex);
      }
      setPageIndex(newPageIndex);
      navigation.setOptions({
        title: routes[newPageIndex].title,
        headerLeft: () => (
          <View style={styles.headerLeftIcon}>
            <RenderIcon iconName={TAB_ICONS[routes[newPageIndex].key]} />
          </View>
        ),
      });
    },
    [pagerViewRef]
  );

  return (
    <View style={styles.container}>
      <TabPages
        setPageIndex={setPageIndexCallback}
        pagerViewRef={pagerViewRef}
      />
      <Divider
        style={{
          backgroundColor: theme.colors.border,
        }}
      />
      <BottomNavigation.Bar
        activeColor={theme.colors.text.normal}
        inactiveColor={theme.colors.text.dim}
        activeIndicatorStyle={{
          backgroundColor: theme.colors.pressable.pressed,
        }}
        style={{
          backgroundColor: theme.colors.background,
        }}
        navigationState={{ index: pageIndex, routes }}
        onTabPress={({ route }) => {
          const targetPageIndex = routes.findIndex((r) => r.key === route.key);
          setPageIndexCallback(targetPageIndex, true);
        }}
        renderIcon={({ route }) => (
          <RenderIcon iconName={TAB_ICONS[route.key]} />
        )}
      />
    </View>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stylesFromTheme = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    page: {},
    headerLeftIcon: {
      marginLeft: 8,
      marginRight: 12,
      color: theme.colors.text.normal,
    },
  });

export default observer(HomeTab);
