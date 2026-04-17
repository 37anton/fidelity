import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";

const PRIMARY = "#0846ed";
const SURFACE = "#f9f5ff";
const SURFACE_CONTAINER_LOW = "#f2efff";
const SURFACE_CONTAINER_HIGH = "#e2dfff";
const SURFACE_CONTAINER_HIGHEST = "#dcd9ff";
const ON_SURFACE = "#2b2a51";
const ON_SURFACE_VARIANT = "#585781";
const OUTLINE = "#74739e";
const TERTIARY = "#0f6b00";
const TERTIARY_CONTAINER = "#2ff801";

const RECENT_HISTORY = [
  {
    id: "1",
    label: "Visite enregistrée",
    sub: "Hier, 16:45 • Avenue Mozart",
    icon: "✅",
    value: "+50 pts",
    valueColor: TERTIARY,
  },
  {
    id: "2",
    label: "Récompense utilisée",
    sub: "12 Mars 2024 • 09:12",
    icon: "🎉",
    value: "Expresso Offert",
    valueColor: OUTLINE,
  },
  {
    id: "3",
    label: "Visite enregistrée",
    sub: "10 Mars 2024 • 14:20",
    icon: "✅",
    value: "+50 pts",
    valueColor: TERTIARY,
  },
];

export default function EtablissementScreen() {
  const params = useLocalSearchParams<{
    id: string;
    name: string;
    location: string;
    icon: string;
    visits: string;
    total: string;
    reward: string;
    progressColor: string;
    percent: string;
  }>();

  const visits = parseInt(params.visits ?? "8");
  const total = parseInt(params.total ?? "10");
  const percent = parseInt(params.percent ?? "80");
  const progressColor = params.progressColor ?? PRIMARY;
  const remaining = total - visits;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerLogoWrapper}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuApLGjxECMJajf4qNLX2p1ffyCwNwHNRVqUp7oZBF3cKIGn-97Kl70FLl1_ttO4ngiJ24e_VgBUE0uxkppsSkM9o2viV--s7q0Y-RiJ_nWeFFbE9zmoyHl-SoPdjHnGikV2kAWFE2IRrefMWIZVkbnYOMu4rkd15jh_ZKW-MP4tcSaY93G8qHkShPuYtZc6zCHMgTN1m62kQvkNGZy9cwY6d_uo0iTiZ49rSYpRVMFJYjW9afMD8L_6-wzbdttwiPf2UIFSQEjW5g",
              }}
              style={styles.headerLogo}
              contentFit="cover"
            />
          </View>
          <Text style={styles.headerTitle}>{params.name ?? "Établissement"}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Points Hero */}
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>Fidélité Totale</Text>
          <View style={styles.heroPointsRow}>
            <Text style={styles.heroPoints}>840</Text>
            <Text style={styles.heroPointsUnit}>Points</Text>
          </View>
        </View>

        {/* Reward Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.progressCardTitle}>
                Prochaine récompense :{"\n"}
                <Text style={{ color: PRIMARY }}>{params.reward ?? "Boisson offerte"}</Text>
              </Text>
              <Text style={styles.progressCardSub}>
                Encore {remaining} visite{remaining > 1 ? "s" : ""} pour en profiter !
              </Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>Niveau Or</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progression</Text>
              <Text style={[styles.progressFraction, { color: progressColor }]}>
                {visits}/{total}
              </Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${percent}%` as any,
                    backgroundColor: progressColor,
                  },
                ]}
              />
            </View>
          </View>

          <Text style={styles.progressCardBgIcon}>{params.icon ?? "☕"}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionPrimary} activeOpacity={0.85}>
            <Text style={styles.actionIcon}>📲</Text>
            <Text style={styles.actionLabelWhite}>Scanner ma visite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionSecondary} activeOpacity={0.85}>
            <View style={styles.actionSecondaryTop}>
              <Text style={styles.actionIcon}>🎁</Text>
              <View style={styles.couponBadge}>
                <Text style={styles.couponBadgeText}>2 dispo</Text>
              </View>
            </View>
            <Text style={styles.actionLabelDark}>Mes coupons valides</Text>
          </TouchableOpacity>
        </View>

        {/* Historique récent */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Historique récent</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>

          {RECENT_HISTORY.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyIconWrapper}>
                <Text style={styles.historyIcon}>{item.icon}</Text>
              </View>
              <View style={styles.historyItemContent}>
                <View style={styles.historyItemRow}>
                  <View>
                    <Text style={styles.historyItemLabel}>{item.label}</Text>
                    <Text style={styles.historyItemSub}>{item.sub}</Text>
                  </View>
                  <Text style={[styles.historyItemValue, { color: item.valueColor }]}>
                    {item.value}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Offre spéciale */}
        <View style={styles.offerCard}>
          <View style={styles.offerContent}>
            <Text style={styles.offerLabel}>Offre Spéciale</Text>
            <Text style={styles.offerTitle}>-50% sur le{"\n"}second Latte</Text>
            <Text style={styles.offerSub}>Valable jusqu'à ce soir</Text>
          </View>
          <TouchableOpacity style={styles.offerButton} activeOpacity={0.85}>
            <Text style={styles.offerButtonText}>+</Text>
          </TouchableOpacity>
          <View style={styles.offerImageWrapper}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuACiEKBXg_51nNqVWt_b8EAKeCBUcKTfFELp7jeQN0zyXS4pNmH4jhs1O4l-Y-X5GJ_NLmVZh-hzZB4jWkrW4UT6KJIMtZHE8tsCO6SHlXuqqDbmKfS4WgMoRTZfR4nYIuugNyUhws_GV-0_Cb3ZKrtmHn1xDZL0eMsfklFuWqgJgbLtiEiZHO3s0g0jEP3qFxrdsaSDQm-PWGytc0gx0eWZJ-JAidXZVH6UGRLnsiFqFOW2RW6mBWRil0Mu1bxC3BdEvZqN-dng",
              }}
              style={styles.offerImage}
              contentFit="cover"
            />
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "rgba(255,255,255,0.85)",
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
  backButton: {
    padding: 4,
  },
  backArrow: {
    fontSize: 22,
    color: PRIMARY,
    fontWeight: "700",
  },
  headerLogoWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: SURFACE_CONTAINER_HIGH,
  },
  headerLogo: {
    width: 36,
    height: 36,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: ON_SURFACE,
    letterSpacing: -0.3,
  },
  moreIcon: {
    fontSize: 22,
    color: ON_SURFACE_VARIANT,
    fontWeight: "700",
  },
  // Scroll
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 20,
  },
  // Hero
  heroSection: {
    gap: 4,
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: PRIMARY,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginLeft: 4,
  },
  heroPointsRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  heroPoints: {
    fontSize: 64,
    fontWeight: "800",
    color: ON_SURFACE,
    letterSpacing: -2,
  },
  heroPointsUnit: {
    fontSize: 20,
    fontWeight: "700",
    color: OUTLINE,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // Progress Card
  progressCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: ON_SURFACE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
    overflow: "hidden",
  },
  progressCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  progressCardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: ON_SURFACE,
    lineHeight: 28,
  },
  progressCardSub: {
    fontSize: 14,
    color: ON_SURFACE_VARIANT,
    marginTop: 4,
  },
  levelBadge: {
    backgroundColor: TERTIARY_CONTAINER,
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  levelBadgeText: {
    color: "#064200",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  progressSection: {
    gap: 10,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: ON_SURFACE,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  progressFraction: {
    fontSize: 24,
    fontWeight: "900",
  },
  progressTrack: {
    height: 20,
    backgroundColor: SURFACE_CONTAINER_HIGHEST,
    borderRadius: 99,
    padding: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
  },
  progressCardBgIcon: {
    position: "absolute",
    bottom: -10,
    right: -4,
    fontSize: 80,
    opacity: 0.06,
  },
  // Quick Actions
  actionsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  actionPrimary: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: PRIMARY,
    borderRadius: 16,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  actionSecondary: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: SURFACE_CONTAINER_LOW,
    borderRadius: 16,
    padding: 20,
    justifyContent: "space-between",
  },
  actionSecondaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  actionIcon: {
    fontSize: 32,
  },
  actionLabelWhite: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 22,
  },
  actionLabelDark: {
    fontSize: 16,
    fontWeight: "700",
    color: ON_SURFACE,
    lineHeight: 22,
  },
  couponBadge: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  couponBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: PRIMARY,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  // History
  historySection: {
    gap: 4,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: ON_SURFACE,
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: "700",
    color: PRIMARY,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  historyIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ON_SURFACE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  historyIcon: {
    fontSize: 22,
  },
  historyItemContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: SURFACE_CONTAINER_LOW,
    paddingBottom: 12,
  },
  historyItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  historyItemLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: ON_SURFACE,
  },
  historyItemSub: {
    fontSize: 12,
    color: ON_SURFACE_VARIANT,
    marginTop: 2,
  },
  historyItemValue: {
    fontSize: 14,
    fontWeight: "800",
  },
  // Offer card
  offerCard: {
    backgroundColor: SURFACE_CONTAINER_HIGH,
    borderRadius: 20,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  offerContent: {
    flex: 1,
    gap: 4,
  },
  offerLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: PRIMARY,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  offerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: ON_SURFACE,
    lineHeight: 28,
  },
  offerSub: {
    fontSize: 13,
    color: ON_SURFACE_VARIANT,
    marginTop: 2,
  },
  offerButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1,
  },
  offerButtonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 32,
  },
  offerImageWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "45%",
    opacity: 0.2,
  },
  offerImage: {
    width: "100%",
    height: "100%",
  },
});
