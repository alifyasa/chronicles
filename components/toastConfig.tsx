import { useCustomTheme } from "@/providers/CustomThemeProviders";
import { saneMerge } from "@/utils/sane-merge";
import { StyleSheet } from "react-native";
import {
  BaseToast,
  BaseToastProps,
  ToastConfig,
} from "react-native-toast-message";

const CustomBaseToast: React.FC<BaseToastProps> = (props: BaseToastProps) => {
  const theme = useCustomTheme();
  const mergedProps = saneMerge(
    {
      text1Style: {
        color: theme.colors.text.normal,
      },
      text2Style: {
        color: theme.colors.text.normal,
      },
    },
    props
  );
  return <BaseToast {...mergedProps} />;
};
const CustomSuccessToast: React.FC<BaseToastProps> = (
  props: BaseToastProps
) => {
  const theme = useCustomTheme();
  const mergedProps = saneMerge(
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
};
const CustomInfoToast: React.FC<BaseToastProps> = (props: BaseToastProps) => {
  const theme = useCustomTheme();
  const mergedProps = saneMerge(
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
};
const CustomErrorToast: React.FC<BaseToastProps> = (props: BaseToastProps) => {
  const theme = useCustomTheme();
  const mergedProps = saneMerge(
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
};

const toastConfig: ToastConfig = {
  success: CustomSuccessToast,
  error: CustomErrorToast,
  info: CustomInfoToast,
};

export default toastConfig;
