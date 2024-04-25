import { Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Theme, useFocusEffect, useTheme } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { Journey, supabase } from "@/utils/supabase";

export default function JourneyListScreen() {
  const theme = useTheme();
  const styles = stylesFromTheme(theme);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const getJourneys = useCallback(() => {
    async function _() {
      let { data: journey, error } = await supabase.from("journey").select("*");
      setJourneys(journey?.concat(journey) as Journey[]);
      console.log(journey);
    }
    _();
  }, []);
  useFocusEffect(getJourneys);
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1, flexDirection: 'column', gap:4}}>
        {journeys.map((journey) => DisplayJourney(journey))}
      </ScrollView>
      {/* <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}

      <Pressable style={styles.createJourneyContainer}>
        <FontAwesome6 name="plus" size={32} style={styles.createJourneyIcon} />
      </Pressable>
    </View>
  );
}

function DisplayJourney(journey: Journey) {
  const theme = useTheme();
  return (
    <View
      key={journey.id}
      style={{
        padding: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.border,
        maxHeight: 256,
      }}
    >
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
    createJourneyContainer: {
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
    },
    createJourneyIcon: {
      color: theme.colors.text,
      margin: "auto",
    },
  });
