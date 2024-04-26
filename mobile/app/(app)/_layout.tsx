import { useSession } from "@/providers/AuthProviders";
import { RecordProvider } from "@/providers/RecordProviders";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const session = useSession();

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <RecordProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="create-record"
          options={{
            title: "Create Record",
          }}
        ></Stack.Screen>
      </Stack>
    </RecordProvider>
  );
}
