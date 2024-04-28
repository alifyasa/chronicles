import { Redirect } from "expo-router";
import React from "react";

export default function RedirectToAuth() {
  console.log("Redirect to auth");
  return <Redirect href="/(auth)/login" />;
}
