import { useSession } from "@/providers/AuthProviders";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const session = useSession();

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
