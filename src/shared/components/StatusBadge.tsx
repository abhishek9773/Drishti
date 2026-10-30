import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type StatusVariant = 'success' | 'warning' | 'danger';

interface StatusBadgeProps {
  label: string;
  variant: StatusVariant;
}

const variants = {
  success: {
    background: colors.successBackground,
    foreground: colors.success,
  },
  warning: {
    background: colors.warningBackground,
    foreground: colors.warning,
  },
  danger: {
    background: colors.dangerBackground,
    foreground: colors.danger,
  },
};

export default function StatusBadge({
  label,
  variant,
}: StatusBadgeProps) {
  const theme = variants[variant];

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: theme.background },
      ]}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: theme.foreground },
        ]}
      />

      <Text
        style={[
          styles.label,
          { color: theme.foreground },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
  },
  label: {
    fontSize: typography.body,
    fontWeight: '700',
  },
});