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
import { useCallback, useEffect, useState } from "react";
import { Journey, supabase } from "@/utils/supabase";
import { router } from "expo-router";

export default function JourneyListScreen() {
  const theme = useTheme();
  const styles = stylesFromTheme(theme);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const getJourneysCallback = useCallback(() => {
    async function getJourneysFromSupabase() {
      setIsFetchingData(true);
      let { data: journey, error } = await supabase.from("journey").select("*");
      setJourneys(journey as Journey[]);
      setIsFetchingData(false);
    }
    getJourneysFromSupabase();
  }, []);
  useFocusEffect(getJourneysCallback);
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1, flexDirection: "column" }}
        contentContainerStyle={{ gap: 12 }}
        data={journeys}
        renderItem={({ item: journey }) => DisplayJourney(journey, theme)}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingData}
            onRefresh={getJourneysCallback}
          />
        }
      ></FlatList>
      {/* <ScrollView
        style={{ flex: 1, flexDirection: "column", gap: 4 }}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingData}
            onRefresh={getJourneysCallback}
          />
        }
      >
        {journeys.map((journey) => DisplayJourney(journey, theme))}
      </ScrollView> */}
      <Pressable
        style={styles.floatingButtonContainer}
        onPress={() => router.push("/(app)/create-journey")}
      >
        <FontAwesome6 name="plus" size={32} style={styles.floatingButtonIcon} />
      </Pressable>
    </View>
  );
}

function DisplayJourney(journey: Journey, theme: Theme) {
  const styles = stylesFromTheme(theme);
  return (
    <View key={journey.id} style={styles.displayJourneyContainer}>
      <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 8 }}>
        {journey.name}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontStyle: journey.description ? "normal" : "italic",
        }}
      >
        {journey.description ?? "No Description"}
      </Text>
    </View>
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
      bottom: 0,
      right: 0,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 90,
      width: 52,
      height: 52,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      marginBottom: 12,
      backgroundColor: theme.colors.background,
    },
    floatingButtonIcon: {
      color: theme.colors.text,
      margin: "auto",
    },
    displayJourneyContainer: {
      padding: 16,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.border,
      maxHeight: 256,
    },
  });
