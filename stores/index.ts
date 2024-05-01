import { authStore } from "./auth/auth";
import { themeStore } from "./theme";
import { recordStore } from "./records";
import { recordEntryStore } from "./record-entry";
import { configure } from "mobx";
interface SavedToAsyncStorage {
  initFromAsyncStorage: () => Promise<void>;
}

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});
export {
  SavedToAsyncStorage,
  authStore,
  themeStore,
  recordStore,
  recordEntryStore,
};
