import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { registerUser } from "@/services/api";

const PRIMARY = "#0846ed";
const SURFACE = "#f9f5ff";
const SURFACE_CONTAINER_LOW = "#f2efff";
const SURFACE_CONTAINER_HIGH = "#e2dfff";
const ON_SURFACE = "#2b2a51";
const ON_SURFACE_VARIANT = "#585781";
const TERTIARY = "#0f6b00";
const TERTIARY_CONTAINER = "#2ff801";
const ERROR = "#b41340";

export default function InscriptionScreen() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMerchant, setIsMerchant] = useState(false);
  const [entreprise, setEntreprise] = useState("");
  const [adresse, setAdresse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!prenom || !nom || !email || !password) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await registerUser({
        firstName: prenom,
        lastName: nom,
        email,
        password,
        isMerchant,
      });
      router.replace("/(tabs)/cartes");
    } catch (e: any) {
      setError(e.message ?? "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.blobTopLeft} />
      <View style={styles.blobBottomRight} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Inscription</Text>
        </View>
        <Text style={styles.headerBrand}>Join the Pulse</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.editorialSection}>
            <View style={styles.newStartBadge}>
              <Text style={styles.newStartBadgeText}>Nouveau Départ</Text>
            </View>
            <Text style={styles.editorialTitle}>
              Libérez {"\n"}votre {"\n"}
              <Text style={styles.editorialTitleItalic}>Énergie.</Text>
            </Text>
            <Text style={styles.editorialSubtitle}>
              Rejoignez l'écosystème de fidélité le plus dynamique. Gagnez des récompenses qui bougent avec vous.
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.nameRow}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Prénom</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Jean"
                  placeholderTextColor="#aba9d7"
                  value={prenom}
                  onChangeText={setPrenom}
                  autoCapitalize="words"
                />
              </View>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Nom</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Dupont"
                  placeholderTextColor="#aba9d7"
                  value={nom}
                  onChangeText={setNom}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWithIcon}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="jean.dupont@pulse.fr"
                  placeholderTextColor="#aba9d7"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.inputLabel}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#aba9d7"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.inputLabel}>Êtes-vous un commerçant ?</Text>
              <View style={styles.radioRow}>
                <TouchableOpacity
                  style={[styles.radioOption, !isMerchant && styles.radioOptionActive]}
                  onPress={() => setIsMerchant(false)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.radioOptionText, !isMerchant && styles.radioOptionTextActive]}>Non</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioOption, isMerchant && styles.radioOptionActive]}
                  onPress={() => setIsMerchant(true)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.radioOptionText, isMerchant && styles.radioOptionTextActive]}>Oui</Text>
                </TouchableOpacity>
              </View>
            </View>

            {isMerchant && (
              <View style={styles.merchantSection}>
                <View style={styles.merchantSectionHeader}>
                  <Text style={styles.merchantSectionIcon}>🏪</Text>
                  <Text style={styles.merchantSectionTitle}>Informations Entreprise</Text>
                </View>
                <View style={styles.fieldGroup}>
                  <Text style={styles.inputLabel}>Nom de l'entreprise</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ma Boutique Pulse"
                    placeholderTextColor="#aba9d7"
                    value={entreprise}
                    onChangeText={setEntreprise}
                  />
                </View>
                <View style={styles.fieldGroup}>
                  <Text style={styles.inputLabel}>Adresse de l'établissement</Text>
                  <View style={styles.inputWithIcon}>
                    <Text style={styles.inputIcon}>📍</Text>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      placeholder="123 Rue de la Réussite, Paris"
                      placeholderTextColor="#aba9d7"
                      value={adresse}
                      onChangeText={setAdresse}
                    />
                  </View>
                </View>
              </View>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={[styles.submitButton, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#f2f1ff" />
              ) : (
                <>
                  <Text style={styles.submitButtonText}>Créer mon compte</Text>
                  <Text style={styles.submitArrow}>→</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.loginText}>
              Déjà membre ?{" "}
              <Text style={styles.loginLink} onPress={() => router.back()}>
                Connectez-vous
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footerGradient} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SURFACE },
  blobTopLeft: {
    position: "absolute", top: -60, left: -80,
    width: 240, height: 240, borderRadius: 120,
    backgroundColor: "#dbeafe", opacity: 0.4,
  },
  blobBottomRight: {
    position: "absolute", bottom: -80, right: -80,
    width: 260, height: 260, borderRadius: 130,
    backgroundColor: TERTIARY_CONTAINER, opacity: 0.1,
  },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: "rgba(255,255,255,0.8)",
    shadowColor: ON_SURFACE, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  backButton: { padding: 6, borderRadius: 99 },
  backArrow: { fontSize: 20, color: PRIMARY, fontWeight: "700" },
  headerTitle: { fontSize: 17, fontWeight: "800", color: ON_SURFACE, letterSpacing: -0.3 },
  headerBrand: { fontSize: 16, fontWeight: "900", color: PRIMARY, fontStyle: "italic", textTransform: "uppercase" },
  scrollContent: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 32, gap: 24 },
  editorialSection: { gap: 12 },
  newStartBadge: {
    alignSelf: "flex-start", backgroundColor: TERTIARY_CONTAINER,
    borderRadius: 99, paddingHorizontal: 14, paddingVertical: 5,
  },
  newStartBadgeText: { color: "#064200", fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 },
  editorialTitle: { fontSize: 52, fontWeight: "900", color: PRIMARY, letterSpacing: -2, lineHeight: 52 },
  editorialTitleItalic: { color: ON_SURFACE, fontStyle: "italic" },
  editorialSubtitle: { fontSize: 15, fontWeight: "500", color: ON_SURFACE_VARIANT, lineHeight: 22, maxWidth: 300 },
  formCard: {
    backgroundColor: "#fff", borderRadius: 20, padding: 24, gap: 20,
    shadowColor: ON_SURFACE, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06, shadowRadius: 20, elevation: 4,
  },
  nameRow: { flexDirection: "row", gap: 12 },
  fieldGroup: { gap: 8 },
  inputLabel: { fontSize: 11, fontWeight: "700", color: ON_SURFACE_VARIANT, textTransform: "uppercase", letterSpacing: 1.5, marginLeft: 8 },
  input: { height: 52, backgroundColor: SURFACE_CONTAINER_LOW, borderRadius: 99, paddingHorizontal: 20, fontSize: 15, fontWeight: "500", color: ON_SURFACE },
  inputWithIcon: { flexDirection: "row", alignItems: "center", backgroundColor: SURFACE_CONTAINER_LOW, borderRadius: 99, paddingHorizontal: 16, height: 52, gap: 8 },
  inputIcon: { fontSize: 16 },
  radioRow: { flexDirection: "row", gap: 12 },
  radioOption: { flex: 1, height: 52, backgroundColor: SURFACE_CONTAINER_LOW, borderRadius: 99, alignItems: "center", justifyContent: "center" },
  radioOptionActive: { backgroundColor: PRIMARY },
  radioOptionText: { fontSize: 15, fontWeight: "700", color: ON_SURFACE_VARIANT },
  radioOptionTextActive: { color: "#fff" },
  merchantSection: { gap: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: SURFACE_CONTAINER_LOW },
  merchantSectionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  merchantSectionIcon: { fontSize: 20 },
  merchantSectionTitle: { fontSize: 17, fontWeight: "800", color: ON_SURFACE },
  errorText: { color: ERROR, fontSize: 13, fontWeight: "600", textAlign: "center" },
  submitButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: PRIMARY, borderRadius: 99, height: 60, gap: 10, marginTop: 4,
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6,
  },
  submitButtonText: { color: "#f2f1ff", fontSize: 17, fontWeight: "700" },
  submitArrow: { color: "#f2f1ff", fontSize: 18, fontWeight: "700" },
  loginText: { textAlign: "center", fontSize: 14, color: ON_SURFACE_VARIANT },
  loginLink: { color: PRIMARY, fontWeight: "700" },
  footerGradient: { height: 4, backgroundColor: PRIMARY, opacity: 0.6 },
});
