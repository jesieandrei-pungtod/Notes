import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Detail() {
  const { id, title, category } = useLocalSearchParams<{
    id: string; title: string; category: string;
  }>();
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.inputBorder }]}>
        <View style={[styles.avatar, { backgroundColor: colors.accentGlow }]}>
          <Text style={[styles.avatarText, { color: colors.accent }]}>
            {title?.charAt(0).toUpperCase() ?? "?"}
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={[styles.fieldLabel, { color: colors.subtext }]}>TITLE</Text>
          <Text style={[styles.fieldValue, { color: colors.text }]}>{title}</Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.inputBorder }]} />

        <View style={styles.field}>
          <Text style={[styles.fieldLabel, { color: colors.subtext }]}>CATEGORY</Text>
          <View style={[styles.badge, { backgroundColor: colors.accentGlow }]}>
            <Text style={[styles.badgeText, { color: colors.accent }]}>{category}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.editButton, { backgroundColor: colors.accent }]}
        onPress={() => router.push({ pathname: "/edit-task", params: { id, title, category } })}
        activeOpacity={0.85}
      >
        <Ionicons name="create-outline" size={20} color="#fff" />
        <Text style={styles.editButtonText}>Edit Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    borderRadius: 20, padding: 24, alignItems: "center",
    gap: 16, borderWidth: 1,
    shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 10, elevation: 3,
  },
  avatar: { width: 72, height: 72, borderRadius: 36, justifyContent: "center", alignItems: "center", marginBottom: 8 },
  avatarText: { fontSize: 32, fontWeight: "800" },
  field: { alignItems: "center", width: "100%" },
  fieldLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 1.2 },
  fieldValue: { fontSize: 22, fontWeight: "700", marginTop: 4, textAlign: "center" },
  divider: { height: 1, width: "100%" },
  badge: { marginTop: 6, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  badgeText: { fontSize: 14, fontWeight: "700" },
  editButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    padding: 16, borderRadius: 14, gap: 8, marginTop: 20,
  },
  editButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});