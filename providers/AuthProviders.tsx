import * as SplashScreen from "expo-splash-screen";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const SessionContext = createContext<Session | null>(null);
export function useSession() {
  const value = useContext(SessionContext);

  return value;
}

export function SessionProvider(props: PropsWithChildren) {
  const [isGettingSession, setIsGettingSession] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsGettingSession(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setIsGettingSession(true);
      setSession(session);
      console.log(`[AUTH] ${_event}`);
      setIsGettingSession(false);
    });
  }, []);

  useEffect(() => {
    if (!isGettingSession) {
      SplashScreen.hideAsync();
    }
  }, [isGettingSession]);

  return (
    <SessionContext.Provider value={session}>
      {props.children}
    </SessionContext.Provider>
  );
}
