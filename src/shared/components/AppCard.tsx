import React, { PropsWithChildren } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

interface AppCardProps extends PropsWithChildren {
  style?: ViewStyle;
}

export default function AppCard({
  children,
  style,
}: AppCardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
});