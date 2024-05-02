import { Redirect } from "expo-router";
import { observer } from "mobx-react";
import React from "react";

import { authStore } from "@/stores";

// const logger = createDefaultLogger("ROOT");
const RedirectToAuth = () => {
  if (!authStore.isInitDone) return null;
  if (!authStore.session) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(app)/" />;
};

export default observer(RedirectToAuth);
