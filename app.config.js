// https://docs.expo.dev/build-reference/variants/
// eslint-disable-next-line no-undef
const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  expo: {
    name: IS_DEV ? "(DEV) Chronicle" : "Chronicle",
    slug: "records",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "chronicle",
    userInterfaceStyle: "automatic",
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#f0f1f5",
        dark: {
          image: "./assets/images/splash.png",
          resizeMode: "contain",
          backgroundColor: "#0a0c0f",
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: IS_DEV ? "id.alifyasa.chronicles.dev" : "id.alifyasa.chronicles",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#f0f1f5",
        dark: {
          image: "./assets/images/splash.png",
          resizeMode: "contain",
          backgroundColor: "#0a0c0f",
        },
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "0e2bbd8f-6ec4-44b2-9034-769d706b9833",
      },
    },
    owner: "alifyasa",
  },
};
