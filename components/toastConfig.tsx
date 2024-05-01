import React from "react";
import { truthyMerge } from "@/utils/sane-merge";
import { StyleSheet } from "react-native";
import {
  BaseToast,
  BaseToastProps,
  ToastConfig,
} from "react-native-toast-message";
import { themeStore } from "@/stores";
import { observer } from "mobx-react";

const CustomBaseToast: React.FC<BaseToastProps> = (props: BaseToastProps) => {
  const { theme } = themeStore;
  const mergedProps = truthyMerge(
    {
      text1Style: {
        color: theme.colors.text.normal,
        fontSize: 16,
      },
      text2Style: {
        color: theme.colors.text.normal,
        fontSize: 14,
      },
    },
    props
  );
  return <BaseToast {...mergedProps} />;
};
const CustomSuccessToast: React.FC<BaseToastProps> = observer(
  (props: BaseToastProps) => {
    const { theme } = themeStore;
    const mergedProps = truthyMerge(
      {
        style: {
          backgroundColor: theme.colors.background,
          borderLeftColor: theme.colors.pressable.normal,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.pressable.normal,
        },
      },
      props
    );
    return <CustomBaseToast {...mergedProps} />;
  }
);
const CustomInfoToast: React.FC<BaseToastProps> = observer(
  (props: BaseToastProps) => {
    const { theme } = themeStore;
    const mergedProps = truthyMerge(
      {
        style: {
          backgroundColor: theme.colors.background,
          borderLeftColor: theme.colors.border,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.border,
        },
      },
      props
    );
    return <CustomBaseToast {...mergedProps} />;
  }
);
const CustomErrorToast: React.FC<BaseToastProps> = observer(
  (props: BaseToastProps) => {
    const { theme } = themeStore;
    const mergedProps = truthyMerge(
      {
        style: {
          backgroundColor: theme.colors.background,
          borderLeftColor: theme.colors.dangerousPressable.background.normal,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.dangerousPressable.background.normal,
        },
      },
      props
    );
    return <CustomBaseToast {...mergedProps} />;
  }
);

const toastConfig: ToastConfig = {
  success: CustomSuccessToast,
  error: CustomErrorToast,
  info: CustomInfoToast,
};

export default toastConfig;
