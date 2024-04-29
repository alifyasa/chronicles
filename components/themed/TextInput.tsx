import { CustomTheme } from "@/constants/themes";
import { useCustomTheme } from "@/providers/CustomThemeProvider";
import React, { forwardRef, useState } from "react";
import {
  Animated,
  Easing,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  function TextInput(props, ref) {
    const theme = useCustomTheme();
    const { style, ...restProps } = props;
    const defaultStyles = stylesFromTheme(theme);

    const MIN_HEIGHT = 46; // One line
    const MAX_HEIGHT = MIN_HEIGHT + 18.8 * 4;
    const [animationHeight] = useState(new Animated.Value(MIN_HEIGHT));
    // Function to handle text input changes
    const handleTextChange = (height: number) => {
      // Calculate new content height based on text input
      const newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height)); // Adjust this multiplier according to your font size and desired spacing

      // Animate height change
      Animated.timing(animationHeight, {
        toValue: newHeight,
        duration: 300, // Adjust animation duration as needed
        useNativeDriver: false,
        easing: Easing.in(Easing.quad),
      }).start();
    };
    return (
      <Animated.View
        style={[
          defaultStyles.animationView,
          {
            maxHeight: MAX_HEIGHT,
            height: animationHeight,
          },
          style,
        ]}
      >
        <RNTextInput
          textAlignVertical="top"
          onContentSizeChange={({
            nativeEvent: {
              contentSize: { height },
            },
          }) => handleTextChange(height)}
          style={[defaultStyles.textInput]}
          {...restProps}
          ref={ref}
        />
      </Animated.View>
    );
  }
);
const stylesFromTheme = (theme: CustomTheme) =>
  StyleSheet.create({
    animationView: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    textInput: {
      flex: 1,
      borderRadius: 5,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.colors.text.normal,
      textAlignVertical: "top",
    },
  });

export default TextInput;
