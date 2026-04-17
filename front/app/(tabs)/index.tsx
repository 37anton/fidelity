import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router } from "expo-router";

const PRIMARY = "#0846ed";
const SURFACE = "#f9f5ff";
const SURFACE_CONTAINER_LOW = "#f2efff";
const ON_SURFACE = "#2b2a51";
const ON_SURFACE_VARIANT = "#585781";
const TERTIARY = "#0f6b00";
const TERTIARY_CONTAINER = "#2ff801";
const SECONDARY_CONTAINER = "#ffc69a";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  function handleCodeChange(value: string, index: number) {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  }

  function handleCodeKeyPress(key: string, index: number) {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Blobs décoratifs */}
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomLeft} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Branding */}
          <View style={styles.brandingSection}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoBorder} />
              <View style={styles.logoCard}>
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAy9P7hbkgD04BVj_qDQXRJ9s6Et5QUzblZwegq0KriP8g_aExHsmw_45ZhCHL42RwAq96bL5Hkz2AMMOJX5QfBy6yXVXZxCgQnpBw4goViNWHZjMrxMHpAbWsLEKKs4XvihNsWwSDlNlQeJ_IPxYh6-Zhc2pvRbDfQT6m-sFie__qxBEhIScthfLOBh-gT_citHH2weK1HilEZ1_U4Atv8H8BS9cmWEnFMZbKZSe4xd0WOORQNU33jYJlafPPL8ozjQpnNmJClSg",
                  }}
                  style={styles.logoImage}
                  contentFit="contain"
                />
              </View>
            </View>

            <View style={styles.titleSection}>
              <Text style={styles.appTitle}>Playground</Text>
              <Text style={styles.appSubtitle}>
                La façon la plus gratifiante de jouer et d'acheter au quotidien.
              </Text>
            </View>
          </View>

          {/* Formulaire */}
          <View style={styles.formSection}>
            <View style={styles.fieldGroup}>
              <Text style={styles.inputLabel}>Adresse e-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="nom@exemple.com"
                placeholderTextColor="#aba9d7"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
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

            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.replace("/(tabs)/cartes")}
              activeOpacity={0.85}
            >
              <Text style={styles.ctaButtonText}>Se connecter</Text>
              <Text style={styles.ctaArrow}>→</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              En vous connectant, vous acceptez nos{" "}
              <Text style={styles.termsLink}>Conditions d'utilisation</Text> et
              notre{" "}
              <Text style={styles.termsLink}>Politique de confidentialité</Text>
              .
            </Text>

            <Text style={styles.registerText}>
              Pas encore de compte ?{" "}
              <Text
                style={styles.registerLink}
                onPress={() => router.push("/inscription")}
              >
                S'inscrire
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal vérification e-mail */}
      <Modal
        visible={showVerification}
        animationType="slide"
        transparent={false}
        statusBarTranslucent
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.verificationContainer}>
            <View style={styles.verificationIconWrapper}>
              <Text style={styles.verificationIcon}>✉️</Text>
            </View>

            <Text style={styles.verificationTitle}>Consultez vos e-mails</Text>
            <Text style={styles.verificationSubtitle}>
              Nous venons d'envoyer un code de vérification à{"\n"}
              <Text style={styles.verificationEmail}>
                {email || "nom@exemple.com"}
              </Text>
            </Text>

            <View style={styles.codeInputRow}>
              {code.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={inputRefs[i]}
                  style={[
                    styles.codeBox,
                    i === 0 && digit === "" && styles.codeBoxActive,
                  ]}
                  value={digit}
                  onChangeText={(v) => handleCodeChange(v.slice(-1), i)}
                  onKeyPress={({ nativeEvent }) =>
                    handleCodeKeyPress(nativeEvent.key, i)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            <TouchableOpacity>
              <Text style={styles.resendText}>Renvoyer le code (45s)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowVerification(false)}
            >
              <Text style={styles.backButtonText}>← Retour</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SURFACE,
  },
  blobTopRight: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: PRIMARY,
    opacity: 0.07,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: TERTIARY,
    opacity: 0.07,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 36,
  },
  // Branding
  brandingSection: {
    alignItems: "center",
    gap: 24,
    marginTop: 24,
  },
  logoWrapper: {
    position: "relative",
    width: 128,
    height: 128,
  },
  logoBorder: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 18,
    backgroundColor: PRIMARY,
    opacity: 0.2,
  },
  logoCard: {
    width: 128,
    height: 128,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ON_SURFACE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    overflow: "hidden",
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  titleSection: {
    alignItems: "center",
    gap: 6,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: "800",
    color: ON_SURFACE,
    letterSpacing: -1,
  },
  appSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: ON_SURFACE_VARIANT,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  // Formulaire
  formSection: {
    width: "100%",
    gap: 16,
  },
  fieldGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: ON_SURFACE_VARIANT,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginLeft: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 64,
    backgroundColor: SURFACE_CONTAINER_LOW,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 17,
    fontWeight: "500",
    color: ON_SURFACE,
    textAlign: "center",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY,
    borderRadius: 16,
    height: 72,
    gap: 10,
    marginTop: 4,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaButtonText: {
    color: "#f2f1ff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  ctaArrow: {
    color: "#f2f1ff",
    fontSize: 20,
    fontWeight: "700",
  },
  termsText: {
    textAlign: "center",
    color: ON_SURFACE_VARIANT,
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  termsLink: {
    color: PRIMARY,
    fontWeight: "700",
  },
  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  // Modal vérification
  verificationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20,
  },
  verificationIconWrapper: {
    width: 88,
    height: 88,
    backgroundColor: TERTIARY_CONTAINER,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: TERTIARY_CONTAINER,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  verificationIcon: {
    fontSize: 40,
  },
  verificationTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: ON_SURFACE,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  verificationSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: ON_SURFACE_VARIANT,
    textAlign: "center",
    lineHeight: 26,
  },
  verificationEmail: {
    color: ON_SURFACE,
    fontWeight: "700",
    fontSize: 17,
  },
  codeInputRow: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 16,
  },
  codeBox: {
    width: 56,
    height: 64,
    backgroundColor: SURFACE_CONTAINER_LOW,
    borderRadius: 10,
    fontSize: 24,
    fontWeight: "900",
    color: ON_SURFACE,
    borderWidth: 2,
    borderColor: "transparent",
  },
  codeBoxActive: {
    borderColor: PRIMARY,
  },
  resendText: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "700",
  },
  backButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backButtonText: {
    color: ON_SURFACE_VARIANT,
    fontSize: 15,
    fontWeight: "600",
  },
  registerText: {
    textAlign: "center",
    fontSize: 14,
    color: ON_SURFACE_VARIANT,
    marginTop: 4,
  },
  registerLink: {
    color: PRIMARY,
    fontWeight: "700",
  },
});
