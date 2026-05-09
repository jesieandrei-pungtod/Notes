import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert, ScrollView, StyleSheet, Text,
  TextInput, TouchableOpacity, View,
} from "react-native";
import { updateNoteDB } from "../lib/database";

const CATEGORIES = ["Work", "Personal", "Ideas", "Important", "Other"];

export default function EditNote() {
  const { id, title, category } = useLocalSearchParams<{
    id: string; title: string; category: string;
  }>();
  const [newTitle, setNewTitle] = useState(title ?? "");
  const [newCategory, setNewCategory] = useState(category ?? "");
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();

  const updateNote = () => {
    if (!id) return Alert.alert("Error", "Missing note ID");
    if (!newTitle.trim()) return Alert.alert("Error", "Title is required");
    if (!newCategory) return Alert.alert("Error", "Please select a category");
    if (saving) return;
    try {
      setSaving(true);
      updateNoteDB(Number(id), newTitle.trim(), newCategory);
      router.replace("/(tabs)/notes");
    } catch {
      setSaving(false);
      Alert.alert("Error", "Failed to update note");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.label, { color: colors.subtext }]}>Title</Text>
      <TextInput
        value={newTitle}
        onChangeText={setNewTitle}
        style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text }]}
        placeholderTextColor={colors.subtext}
      />

      <Text style={[styles.label, { color: colors.subtext }]}>Category</Text>
      <View style={styles.categoriesGrid}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              { backgroundColor: colors.chipBg, borderColor: colors.chipBorder },
              newCategory === cat && { backgroundColor: colors.accent, borderColor: colors.accent },
            ]}
            onPress={() => setNewCategory(cat)}
          >
            <Text style={[styles.categoryChipText, { color: colors.text }, newCategory === cat && { color: "#fff" }]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: saving ? colors.subtext : colors.accent }]}
        onPress={updateNote}
        activeOpacity={0.85}
        disabled={saving}
      >
        <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
        <Text style={styles.buttonText}>{saving ? "Saving..." : "Update Note"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 8 },
  label: { fontSize: 13, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6, marginTop: 10 },
  input: { padding: 14, borderRadius: 12, fontSize: 16, borderWidth: 1 },
  categoriesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 2 },
  categoryChipText: { fontSize: 14, fontWeight: "600" },
  button: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    padding: 16, borderRadius: 14, gap: 8, marginTop: 24,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});