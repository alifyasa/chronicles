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
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log("Session Updated")
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session Updated")
    });
  }, []);
  return <SessionContext.Provider value={session}>{props.children}</SessionContext.Provider>;
}
