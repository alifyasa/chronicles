export type CustomTheme = {
  dark: boolean;
  colors: {
    background: string;
    border: string;
    text: Record<"normal" | "dim" | "error", string>;
    pressable: Record<"pressed" | "normal", string>;
    dangerousPressable: {
      background: Record<"pressed" | "normal", string>;
      text: string;
    };
  };
};
