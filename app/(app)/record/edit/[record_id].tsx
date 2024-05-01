import React from "react";
import { CustomTheme } from "@/constants/themes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import Text from "@/components/themed/Text";
import { themeStore } from "@/stores";
import { recordStore } from "@/stores";
import Toast from "react-native-toast-message";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

function RecordEditScreen() {
  const theme = themeStore.theme;
  const styles = stylesFromTheme(theme);

  const { record_id: recordId } = useLocalSearchParams<{ record_id: string }>();
  const allRecordsKV = recordStore.recordsKV;

  const navigation = useNavigation();
  useFocusEffect(() => {
    if (recordId) {
      navigation.setOptions({
        title: `Edit ${allRecordsKV[recordId].name}`,
      });
    } else {
      Toast.show({
        type: "Error",
        text1: "Error",
        text2: "Record ID does not exist",
      });
      router.replace("/");
    }
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

const ObserverRecordEditScreen = observer(RecordEditScreen);
export default ObserverRecordEditScreen;
