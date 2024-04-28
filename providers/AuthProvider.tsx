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
import { definedMerge } from "@/utils/sane-merge";
import { createDefaultLogger } from "@/utils/logging";

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

const logger = createDefaultLogger("PROVIDER/AUTH");
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
      logger.log(_event);
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
    });
  }, []);

  return (
    <SessionContext.Provider value={sessionContext}>
      {props.children}
    </SessionContext.Provider>
  );
}
