import React from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "react-native-toast-message";
import { SplashScreen } from "expo-router";
import { definedMerge } from "@/utils/sane-merge";

type SessionContextType = {
  session: Session | null;
  isInitDone: boolean;
};
const defaultSessionContext: SessionContextType = {
  session: null,
  isInitDone: false,
};
export const SessionContext = createContext<SessionContextType>(
  defaultSessionContext
);
export function useSession() {
  const value = useContext(SessionContext);

  return value;
}

export function SessionProvider(props: PropsWithChildren) {
  const [sessionContext, setSessionContext] = useState(defaultSessionContext);
  const updateSession = (partSession: Partial<SessionContextType>) => {
    setSessionContext((prev) => definedMerge(prev, partSession));
  };
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      let newSession: Partial<SessionContextType> = {
        session,
      };
      if (_event === "INITIAL_SESSION") {
        newSession = {
          session,
          isInitDone: true,
        };
      }
      updateSession(newSession);
      console.log(`[AUTH] ${_event}`);
      Toast.show({
        text1: "Auth Event",
        text2: _event,
        type: "info",
      });
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      updateSession({
        session,
      });
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <SessionContext.Provider value={sessionContext}>
      {props.children}
    </SessionContext.Provider>
  );
}
