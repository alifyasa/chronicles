import { Redirect } from "expo-router";
import React from "react";

export default function RedirectToTabs() {
  console.log("Redirect to tabs");
  return <Redirect href="/(app)/tabs" />;
}
