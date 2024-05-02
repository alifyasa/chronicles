import { supabase } from "@/utils/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { makeAutoObservable, runInAction } from "mobx";

type AuthStateChangeCallback = (
  ev: AuthChangeEvent,
  session: Session | null
) => void;

class AuthStore {
  session: Session | null = null;
  isInitDone = false;
  stateChangeCallbacks: Record<string, AuthStateChangeCallback> = {};

  setSession(session: Session | null) {
    this.session = session;
  }

  setIsInitDone(isInitDone: boolean) {
    this.isInitDone = isInitDone;
  }

  addAuthStateChangeCallback(
    eventName: string,
    callback: AuthStateChangeCallback
  ) {
    this.stateChangeCallbacks[eventName] = callback;
  }

  removeAuthStateChangeCallback(eventName: string) {
    delete this.stateChangeCallbacks[eventName];
  }

  constructor() {
    makeAutoObservable(this);

    this.addAuthStateChangeCallback("INITIALIZE_SESSION", (ev, session) => {
      if (ev === "INITIAL_SESSION") {
        this.setIsInitDone(true);
        this.setSession(session);
      }
    });
    supabase.auth.onAuthStateChange((ev, session) => {
      this.setSession(session);
      runInAction(() => {
        for (const key in this.stateChangeCallbacks) {
          const callbackFunc = this.stateChangeCallbacks[key];
          callbackFunc(ev, session);
        }
      });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      this.setSession(session);
    });
  }
}
const authStore = new AuthStore();
export { authStore };
