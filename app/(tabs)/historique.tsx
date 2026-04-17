import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const PRIMARY = "#0846ed";
const SURFACE = "#f9f5ff";
const SURFACE_CONTAINER_LOW = "#f2efff";
const ON_SURFACE = "#2b2a51";
const ON_SURFACE_VARIANT = "#585781";
const TERTIARY = "#0f6b00";
const TERTIARY_CONTAINER = "#2ff801";
const SECONDARY_CONTAINER = "#ffc69a";
const ON_SECONDARY_CONTAINER = "#6f3a00";
const SURFACE_VARIANT = "#dcd9ff";
const ERROR = "#b41340";

const VISITS = [
  {
    group: "Aujourd'hui",
    items: [
      {
        id: "1",
        name: "The Caffeine Lab",
        time: "14:45",
        action: "Visite enregistrée",
        icon: "☕",
        badge: "Gagné",
        badgeBg: TERTIARY_CONTAINER,
        badgeText: "#064200",
        points: "+450",
        pointsColor: TERTIARY,
      },
      {
        id: "2",
        name: "Urban Threads",
        time: "11:20",
        action: "Récompense appliquée",
        icon: "🛍️",
        badge: "Utilisé",
        badgeBg: SECONDARY_CONTAINER,
        badgeText: ON_SECONDARY_CONTAINER,
        points: "-1 200",
        pointsColor: ERROR,
      },
    ],
  },
  {
    group: "Hier",
    items: [
      {
        id: "3",
        name: "Iron Paradise Gym",
        time: "18:15",
        action: "Check-in quotidien",
        icon: "🏋️",
        badge: "Gagné",
        badgeBg: TERTIARY_CONTAINER,
        badgeText: "#064200",
        points: "+100",
        pointsColor: TERTIARY,
      },
      {
        id: "4",
        name: "Noodle Theory",
        time: "13:30",
        action: "Visite enregistrée",
        icon: "🍜",
        badge: "Gagné",
        badgeBg: TERTIARY_CONTAINER,
        badgeText: "#064200",
        points: "+225",
        pointsColor: TERTIARY,
      },
      {
        id: "5",
        name: "Swift Fuel Hub",
        time: "08:05",
        action: "Visite enregistrée",
        icon: "⛽",
        badge: "Traité",
        badgeBg: SURFACE_VARIANT,
        badgeText: ON_SURFACE_VARIANT,
        points: "+85",
        pointsColor: ON_SURFACE_VARIANT,
        faded: true,
      },
    ],
  },
];

export default function HistoriqueScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgWOYdtC975pCiINpUg6agKIhwp8lTSPEmw1L0NfTJ5tzetgKbLmYXB1VMLZhJPhBCLF3Tzuv_sQ4_NqJBwxvhF6B-uSdr_1JedplhfI1Ok9fPnXKw2oReoxXtA_wgLCkhTlrPmvQ7I2Ke3FDWrH8q0ikbTdBOcFTiPB_jB3z56EfSwC6aFqTreOxvJaANmnJIiQQSwHO_EeRe_wf7y0Unu3ma6J9Cr-LXg-wS_csVC2h-b9FlayTTII8kHdllTjFqSVjfBj9uxw",
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
        {/* Hero Stats */}
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>Historique d'Activité</Text>
          <Text style={styles.heroTitle}>Historique des Visites</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statBgIcon}>⭐</Text>
              <Text style={styles.statCardLabel}>Points Cumulés</Text>
              <Text style={[styles.statCardValue, { color: PRIMARY }]}>
                12 450
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statBgIcon}>📅</Text>
              <Text style={styles.statCardLabel}>Visites ce mois-ci</Text>
              <Text style={[styles.statCardValue, { color: ON_SURFACE }]}>
                24
              </Text>
            </View>
          </View>
        </View>

        {/* Visit Groups */}
        {VISITS.map((group) => (
          <View key={group.group} style={styles.group}>
            <Text style={styles.groupTitle}>{group.group}</Text>
            {group.items.map((item) => (
              <View
                key={item.id}
                style={[styles.visitCard, item.faded && { opacity: 0.7 }]}
              >
                <View style={styles.visitLeft}>
                  <View style={styles.visitIconWrapper}>
                    <Text style={styles.visitIcon}>{item.icon}</Text>
                  </View>
                  <View>
                    <Text style={styles.visitName}>{item.name}</Text>
                    <Text style={styles.visitMeta}>
                      {item.time} • {item.action}
                    </Text>
                  </View>
                </View>
                <View style={styles.visitRight}>
                  <View
                    style={[
                      styles.visitBadge,
                      { backgroundColor: item.badgeBg },
                    ]}
                  >
                    <Text
                      style={[styles.visitBadgeText, { color: item.badgeText }]}
                    >
                      {item.badge}
                    </Text>
                  </View>
                  <Text
                    style={[styles.visitPoints, { color: item.pointsColor }]}
                  >
                    {item.points}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* Load More */}
        <TouchableOpacity style={styles.loadMoreButton} activeOpacity={0.7}>
          <Text style={styles.loadMoreText}>Voir toutes les activités</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
    gap: 24,
  },
  // Hero
  heroSection: {
    gap: 8,
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: PRIMARY,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: ON_SURFACE,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: ON_SURFACE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    overflow: "hidden",
  },
  statBgIcon: {
    position: "absolute",
    top: -4,
    right: -4,
    fontSize: 52,
    opacity: 0.1,
  },
  statCardLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: ON_SURFACE_VARIANT,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  statCardValue: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
  },
  // Groups
  group: {
    gap: 10,
  },
  groupTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: ON_SURFACE,
    paddingHorizontal: 4,
  },
  visitCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: ON_SURFACE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  visitLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  visitIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: SURFACE_CONTAINER_LOW,
    alignItems: "center",
    justifyContent: "center",
  },
  visitIcon: {
    fontSize: 22,
  },
  visitName: {
    fontSize: 15,
    fontWeight: "700",
    color: ON_SURFACE,
  },
  visitMeta: {
    fontSize: 13,
    color: ON_SURFACE_VARIANT,
    marginTop: 2,
  },
  visitRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  visitBadge: {
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  visitBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  visitPoints: {
    fontSize: 18,
    fontWeight: "900",
  },
  // Load more
  loadMoreButton: {
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#859aff",
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginTop: 8,
  },
  loadMoreText: {
    fontSize: 13,
    fontWeight: "700",
    color: PRIMARY,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
