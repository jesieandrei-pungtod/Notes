import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const { colors, theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Theme Toggle */}
      <TouchableOpacity
        style={[styles.themeToggle, { backgroundColor: colors.card }]}
        onPress={toggleTheme}
      >
        <Ionicons
          name={theme === "dark" ? "sunny-outline" : "moon-outline"}
          size={20}
          color={colors.text}
        />
      </TouchableOpacity>

      {/* Center Content */}
      <View style={styles.centerContent}>
        {/* Icon Ring */}
        <View style={[styles.iconRing, { borderColor: colors.accent }]}>
          <View style={[styles.iconCircle, { backgroundColor: colors.accent }]}>
            <Ionicons name="document-text" size={52} color="#fff" />
          </View>
        </View>

        {/* Title Badge */}
        <View style={[styles.titleBadge, { backgroundColor: colors.accent }]}>
          <Text style={styles.titleText}>Mini Notes</Text>
        </View>

        {/* Tagline */}
        <Text style={[styles.tagline, { color: colors.tagline }]}>
          THINK • CAPTURE • REMEMBER
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          Your thoughts, beautifully{"\n"}organized
        </Text>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.openButton, { backgroundColor: colors.accent }]}
          onPress={() => router.push("/(tabs)/notes")}
          activeOpacity={0.85}
        >
          <Ionicons name="folder-outline" size={22} color="#fff" />
          <Text style={styles.openButtonText}>Open My Notes</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.createRow}>
          <TouchableOpacity
            style={[styles.createBtn, { backgroundColor: colors.accent }]}
            onPress={() => router.push("/add-task")}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.createLabel, { color: colors.text }]}>
            Create New Note
          </Text>
        </View>

        <Text style={[styles.footerTagline, { color: colors.subtext }]}>
          SWIPE • SEARCH • ORGANIZE
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 30 },
  themeToggle: {
    position: "absolute",
    top: 60,
    right: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  iconRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBadge: {
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 20,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  bottomActions: { gap: 14 },
  openButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderRadius: 18,
    gap: 12,
  },
  openButtonText: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  createRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  createBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  createLabel: { fontSize: 16, fontWeight: "600" },
  footerTagline: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 4,
  },
});