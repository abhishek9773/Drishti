import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../../../shared/theme/colors';

type DeviceStatus = 'connected' | 'disconnected' | 'connecting';

interface HomeScreenProps {
  deviceStatus?: DeviceStatus;
  cameraAvailable?: boolean;
  leftDistanceMm?: number | null;
  rightDistanceMm?: number | null;
  batteryPercentage?: number | null;
}

interface StatusCardProps {
  title: string;
  value: string;
  description: string;
  indicator: 'success' | 'warning' | 'error' | 'neutral';
}

function StatusCard({ title, value, description, indicator }: StatusCardProps) {
  const indicatorColor = {
    success: '#23835B',
    warning: '#B7791F',
    error: '#C0392B',
    neutral: '#687780',
  }[indicator];

  return (
    <View style={styles.statusCard}>
      <View style={styles.cardHeading}>
        <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

function formatDistance(distance: number | null | undefined): string {
  if (distance == null || !Number.isFinite(distance) || distance < 0) {
    return 'Unavailable';
  }
  return distance >= 1000
    ? `${(distance / 1000).toFixed(2)} m`
    : `${Math.round(distance)} mm`;
}

function formatBattery(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value) || value < 0 || value > 100) {
    return 'Unavailable';
  }
  return `${Math.round(value)}%`;
}

export default function HomeScreen({
  deviceStatus = 'disconnected',
  cameraAvailable = false,
  leftDistanceMm = null,
  rightDistanceMm = null,
  batteryPercentage = null,
}: HomeScreenProps) {
  const connected = deviceStatus === 'connected';

  const connectionLabel = {
    connected: 'Connected',
    disconnected: 'Not connected',
    connecting: 'Connecting...',
  }[deviceStatus];

  const connectionColor = {
    connected: '#23835B',
    disconnected: '#C0392B',
    connecting: '#B7791F',
  }[deviceStatus];

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>DRISHTI</Text>
            <Text style={styles.subtitle}>Smart Cap Assistant</Text>
          </View>
          <View style={styles.brandIcon}>
            <Text style={styles.brandIconText}>D</Text>
          </View>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>{'Your world,\nwithin reach.'}</Text>
          <Text style={styles.welcomeDescription}>
            Monitor your Smart Cap and check its sensors from one simple dashboard.
          </Text>
        </View>

        <View style={styles.connectionCard}>
          <View style={styles.connectionTop}>
            <View style={styles.connectionTextContainer}>
              <Text style={styles.sectionEyebrow}>SMART CAP STATUS</Text>
              <Text style={styles.connectionTitle}>{connectionLabel}</Text>
            </View>
            <View style={[styles.connectionIndicator, { backgroundColor: connectionColor }]} />
          </View>
          <Text style={styles.connectionDescription}>
            {connected
              ? 'Your cap is connected to the app.'
              : deviceStatus === 'connecting'
                ? 'Trying to connect to your Smart Cap.'
                : 'Connect your phone to the Smart Cap Wi-Fi to get started.'}
          </Text>
          <View style={styles.connectionFooter}>
            <Text style={styles.networkLabel}>DEVICE · ESP32-S3</Text>
            <View style={styles.networkBadge}>
              <Text style={styles.networkBadgeText}>{connected ? 'ONLINE' : 'OFFLINE'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Sensor overview</Text>
            <Text style={styles.sectionSubtitle}>Live hardware information</Text>
          </View>
          <View style={styles.liveBadge}>
            <View style={[styles.liveDot, { backgroundColor: connected ? '#23835B' : '#9AA6AC' }]} />
            <Text style={styles.liveText}>{connected ? 'LIVE' : 'IDLE'}</Text>
          </View>
        </View>

        <View style={styles.sensorGrid}>
          <StatusCard
            title="Left sensor"
            value={formatDistance(leftDistanceMm)}
            description="Obstacle distance"
            indicator={connected && leftDistanceMm != null ? 'success' : 'neutral'}
          />
          <StatusCard
            title="Right sensor"
            value={formatDistance(rightDistanceMm)}
            description="Obstacle distance"
            indicator={connected && rightDistanceMm != null ? 'success' : 'neutral'}
          />
          <StatusCard
            title="Battery"
            value={formatBattery(batteryPercentage)}
            description="Remaining charge"
            indicator={batteryPercentage != null ? 'success' : 'neutral'}
          />
          <StatusCard
            title="Camera"
            value={cameraAvailable && connected ? 'Available' : 'Unavailable'}
            description="Camera hardware"
            indicator={cameraAvailable && connected ? 'success' : 'neutral'}
          />
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Camera preview</Text>
            <Text style={styles.sectionSubtitle}>Smart Cap camera feed</Text>
          </View>
        </View>

        <View style={styles.cameraCard}>
          <View style={styles.cameraIconContainer}>
            <Text style={styles.cameraIcon}>◉</Text>
          </View>
          <Text style={styles.cameraTitle}>
            {cameraAvailable && connected ? 'Camera is ready' : 'Camera preview unavailable'}
          </Text>
          <Text style={styles.cameraDescription}>
            {cameraAvailable && connected
              ? 'The camera is available. Live preview integration is the next step.'
              : 'Connect to the Smart Cap and check camera availability to view the feed.'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Designed for independence</Text>
            <Text style={styles.infoDescription}>
              Drishti brings your Smart Cap connection, sensors, and camera status together in one place.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>DRISHTI · SMART ASSISTIVE TECHNOLOGY</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  brand: { color: colors.primary, fontSize: 25, fontWeight: '900', letterSpacing: 3 },
  subtitle: { color: colors.muted, fontSize: 12, marginTop: 3, letterSpacing: 0.5 },
  brandIcon: {
    height: 46, width: 46, borderRadius: 16, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  brandIconText: { color: '#FFFFFF', fontSize: 25, fontWeight: '800' },
  welcomeSection: { marginBottom: 24 },
  welcomeTitle: {
    color: colors.text, fontSize: 34, fontWeight: '800', lineHeight: 41, letterSpacing: -0.8,
  },
  welcomeDescription: {
    color: colors.muted, fontSize: 14, lineHeight: 22, marginTop: 10, maxWidth: 320,
  },
  connectionCard: {
    backgroundColor: colors.primary, borderRadius: 24, padding: 22, marginBottom: 30,
  },
  connectionTop: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  connectionTextContainer: { flex: 1 },
  sectionEyebrow: { color: '#C8E7DE', fontSize: 10, fontWeight: '800', letterSpacing: 1.8 },
  connectionTitle: { color: '#FFFFFF', fontSize: 25, fontWeight: '800', marginTop: 8 },
  connectionIndicator: {
    height: 12, width: 12, borderRadius: 6, borderWidth: 3, borderColor: '#FFFFFF',
  },
  connectionDescription: { color: '#E1F0EC', fontSize: 13, lineHeight: 21, marginTop: 12 },
  connectionFooter: {
    borderTopWidth: 1, borderTopColor: '#43877E', marginTop: 20, paddingTop: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  networkLabel: { color: '#D1E9E3', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  networkBadge: { backgroundColor: '#FFFFFF', paddingHorizontal: 11, paddingVertical: 6, borderRadius: 20 },
  networkBadgeText: { color: colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 0.7 },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
  },
  sectionTitle: { color: colors.text, fontSize: 19, fontWeight: '800' },
  sectionSubtitle: { color: colors.muted, fontSize: 12, marginTop: 5 },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7,
    borderWidth: 1, borderColor: colors.border,
  },
  liveDot: { height: 7, width: 7, borderRadius: 4, marginRight: 6 },
  liveText: { color: colors.text, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  sensorGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30,
  },
  statusCard: {
    width: '48%', backgroundColor: colors.surface, borderRadius: 18,
    borderWidth: 1, borderColor: colors.border, padding: 15, marginBottom: 12, minHeight: 132,
  },
  cardHeading: { flexDirection: 'row', alignItems: 'center' },
  indicator: { height: 7, width: 7, borderRadius: 4, marginRight: 7 },
  cardTitle: { color: colors.muted, fontSize: 12, fontWeight: '600', flexShrink: 1 },
  cardValue: { color: colors.text, fontSize: 21, fontWeight: '800', marginTop: 18 },
  cardDescription: { color: colors.muted, fontSize: 11, marginTop: 6 },
  cameraCard: {
    backgroundColor: colors.surface, borderRadius: 22, borderWidth: 1,
    borderColor: colors.border, paddingHorizontal: 24, paddingVertical: 30,
    alignItems: 'center', marginBottom: 20,
  },
  cameraIconContainer: {
    height: 62, width: 62, borderRadius: 22, backgroundColor: '#E5F1ED',
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  cameraIcon: { color: colors.primary, fontSize: 35, fontWeight: '700' },
  cameraTitle: { color: colors.text, fontSize: 16, fontWeight: '800', textAlign: 'center' },
  cameraDescription: {
    color: colors.muted, fontSize: 12, lineHeight: 20, textAlign: 'center', marginTop: 8,
  },
  infoCard: {
    flexDirection: 'row', backgroundColor: '#E8F1EE', borderRadius: 18,
    padding: 16, marginBottom: 28,
  },
  infoIcon: {
    height: 25, width: 25, borderRadius: 13, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  infoIconText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  infoTextContainer: { flex: 1 },
  infoTitle: { color: colors.text, fontSize: 13, fontWeight: '800' },
  infoDescription: { color: colors.muted, fontSize: 12, lineHeight: 19, marginTop: 5 },
  footer: {
    color: colors.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.3, textAlign: 'center',
  },
});
