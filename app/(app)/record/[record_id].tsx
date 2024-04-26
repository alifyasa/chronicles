import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProviders";
import { useRecord } from "@/providers/RecordProviders";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
        <Pressable style={{marginRight: 8}}>
          <FontAwesome6 name="pen" size={20} color={theme.colors.text} />
        </Pressable>
      ),
    });
  });
  return (
    <View style={styles.container}>
      <Text style={{color: theme.colors.text}}>{recordKV[recordId].name}</Text>
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
