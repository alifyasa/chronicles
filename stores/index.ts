import { configure } from "mobx";

import { authStore } from "./auth/auth";
import { recordEntryStore } from "./record-entry";
import { recordStore } from "./records";
import { themeStore } from "./theme";
interface SavedToAsyncStorage {
  initFromAsyncStorage: () => Promise<void>;
}

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});
export {
  authStore,
  recordEntryStore,
  recordStore,
  SavedToAsyncStorage,
  themeStore,
};
