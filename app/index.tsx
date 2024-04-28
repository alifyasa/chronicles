import { createDefaultLogger } from "@/utils/logging";
import { Redirect } from "expo-router";
import React from "react";

const logger = createDefaultLogger("ROOT");
export default function RedirectToAuth() {
  logger.log("Redirecting to Auth");
  return <Redirect href="/(auth)/login" />;
}
