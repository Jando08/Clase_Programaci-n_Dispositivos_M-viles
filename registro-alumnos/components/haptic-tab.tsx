import { PlatformPressable } from 'expo-router/react-navigation';
import * as Haptics from 'expo-haptics';
import type { ColorValue } from 'react-native';
import type { BottomTabBarButtonProps } from 'expo-router/js-tabs';

type TabBarButtonProps = Omit<BottomTabBarButtonProps, 'pressColor' | 'hoverEffect'> & {
  pressColor?: ColorValue;
  hoverEffect?: { color?: ColorValue; hoverOpacity?: number; activeOpacity?: number };
};

export function HapticTab(props: TabBarButtonProps) {
  const { pressColor, hoverEffect, ...rest } = props;
  return (
    <PlatformPressable
      {...rest}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
