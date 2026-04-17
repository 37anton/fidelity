import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const PRIMARY = "#0846ed";
const SURFACE = "#f9f5ff";
const SURFACE_CONTAINER_LOW = "#f2efff";
const SURFACE_CONTAINER_HIGHEST = "#dcd9ff";
const ON_SURFACE = "#2b2a51";
const ON_SURFACE_VARIANT = "#585781";
const OUTLINE = "#74739e";
const TERTIARY = "#0f6b00";
const SECONDARY = "#8c4a00";
const SECONDARY_CONTAINER = "#ffc69a";

const CARDS = [
  {
    id: "1",
    name: "The Roast Lab",
    location: "Quartier Centre-Ville",
    icon: "☕",
    visits: 8,
    total: 10,
    reward: "boisson offerte",
    gradient: PRIMARY,
    progressColor: PRIMARY,
    badgeBg: "#e8eeff",
    badgeText: PRIMARY,
    percent: 80,
  },
  {
    id: "2",
    name: "Sourdough Bloom",
    location: "East Village",
    icon: "🥐",
    visits: 4,
    total: 10,
    reward: "pâtisserie offerte",
    gradient: SECONDARY,
    progressColor: SECONDARY,
    badgeBg: "#ffeedd",
    badgeText: SECONDARY,
    percent: 40,
  },
  {
    id: "3",
    name: "Green Bowl Co.",
    location: "North Plaza",
    icon: "🌿",
    visits: 9,
    total: 10,
    reward: "Supplément Offert",
    gradient: TERTIARY,
    progressColor: TERTIARY,
    badgeBg: "#e8ffde",
    badgeText: TERTIARY,
    percent: 90,
  },
];

export default function CartesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxEAr0Vycz84EM-0vRKCW8Q65AFYH0BM8Arr2OXLdIA9uTWnV9O3mPkfMCGp2c4W4oK0wk-FEMbLI_qWmPx2cTc59GGIvvnwTrrybno8-10HTI6fthBHNP6CT_5u7bzAOaaTS6z8toKOpXhlCf9bVlRhs87ZsphJ81dWjxvkHkSSfEP3OdyrXf6pNEw7Pb1j2fLN9Th0JnH8AaybejsDtHYarwKp2IxiQ3bDF2eccR1x8tmT187tviPKiv-SGMCVn0_70KaAdafA",
              }}
              style={styles.avatar}
              contentFit="cover"
            />
          </View>
          <Text style={styles.headerTitle}>Playground</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.notifIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <View style={styles.qrGlow} />
          <View style={styles.qrCard}>
            <View style={styles.qrTitleBlock}>
              <Text style={styles.qrLabel}>Scan Rapide</Text>
              <Text style={styles.qrTitle}>Votre Identifiant</Text>
            </View>
            <View style={styles.qrImageWrapper}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZQJo7RlGSQa8TkXYrFGKKuHNhDmurZ0BYO7o9K74FvxzUrDpxLxJpRiodB7iXHfo-i2jzSlNCqbqxGDmogpNFxLKzCNuNVKmlqZ0UJl5SC5IbGPaJDDlRZlboki9V82faj-ReKGzalZ11jRXH9j5OTz_3ie45VAy82j1JlHL5_kyZNpkC2YijjkBLYTEUwDcZB_BaqExjaaEL45_fZB-tv_L23LIk4FP5UINWa4cgaGpoHdVx1ywz1jRZeAIXsyMlauJpXFwJ_g",
                }}
                style={styles.qrImage}
                contentFit="contain"
              />
            </View>
            <View style={styles.qrIdBadge}>
              <Text style={styles.qrIdIcon}>✓</Text>
              <Text style={styles.qrIdText}>ID: PLAY-4402-192</Text>
            </View>
          </View>
        </View>

        {/* Mes Établissements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionLabel}>Collection</Text>
              <Text style={styles.sectionTitle}>Mes Établissements</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Voir Tout</Text>
            </TouchableOpacity>
          </View>

          {CARDS.map((card) => (
            <View key={card.id} style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={styles.cardLeft}>
                  <View
                    style={[
                      styles.cardIconWrapper,
                      { backgroundColor: card.gradient },
                    ]}
                  >
                    <Text style={styles.cardIcon}>{card.icon}</Text>
                  </View>
                  <View>
                    <Text style={styles.cardName}>{card.name}</Text>
                    <Text style={styles.cardLocation}>{card.location}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.visitsBadge,
                    { backgroundColor: card.badgeBg },
                  ]}
                >
                  <Text style={[styles.visitsText, { color: card.badgeText }]}>
                    {card.visits}/{card.total} visites
                  </Text>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>
                    Progression vers {card.reward}
                  </Text>
                  <Text
                    style={[styles.progressPercent, { color: card.progressColor }]}
                  >
                    {card.percent}%
                  </Text>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${card.percent}%` as any,
                        backgroundColor: card.progressColor,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SURFACE,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderBottomWidth: 0,
    shadowColor: ON_SURFACE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#859aff",
  },
  avatar: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: PRIMARY,
    letterSpacing: -0.5,
  },
  notifIcon: {
    fontSize: 22,
  },
  // Scroll
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 32,
  },
  // QR Section
  qrSection: {
    alignItems: "center",
  },
  qrGlow: {
    position: "absolute",
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    borderRadius: 24,
    backgroundColor: PRIMARY,
    opacity: 0.06,
  },
  qrCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    gap: 20,
    width: "100%",
    shadowColor: ON_SURFACE,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 8,
  },
  qrTitleBlock: {
    alignItems: "center",
    gap: 2,
  },
  qrLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: PRIMARY,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  qrTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: ON_SURFACE,
    letterSpacing: -0.5,
  },
  qrImageWrapper: {
    width: 200,
    height: 200,
    backgroundColor: SURFACE_CONTAINER_LOW,
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: "#aba9d740",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  qrImage: {
    width: "100%",
    height: "100%",
  },
  qrIdBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e8eeff",
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  qrIdIcon: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: "700",
  },
  qrIdText: {
    fontSize: 12,
    fontWeight: "700",
    color: PRIMARY,
  },
  // Section
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 4,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: OUTLINE,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: ON_SURFACE,
    letterSpacing: -0.5,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "700",
    color: PRIMARY,
  },
  // Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    gap: 20,
    shadowColor: ON_SURFACE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  cardIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "700",
    color: ON_SURFACE,
    letterSpacing: -0.3,
  },
  cardLocation: {
    fontSize: 13,
    fontWeight: "500",
    color: OUTLINE,
    marginTop: 2,
  },
  visitsBadge: {
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  visitsText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  // Progress
  progressSection: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: ON_SURFACE,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    flex: 1,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: "900",
  },
  progressTrack: {
    height: 14,
    backgroundColor: SURFACE_CONTAINER_HIGHEST,
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
  },
});
