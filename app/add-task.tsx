import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert, ScrollView, StyleSheet, Text,
  TextInput, TouchableOpacity, View,
} from "react-native";
import { addNoteDB } from "../lib/database";

const CATEGORIES = ["Work", "Personal", "Ideas", "Important", "Other"];

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const { colors } = useTheme();

  const saveNote = () => {
    if (!title.trim()) return Alert.alert("Error", "Please enter a title.");
    if (!category) return Alert.alert("Error", "Please select a category.");

    try {
      console.log("💾 calling addNoteDB with:", title.trim(), category);
      addNoteDB(title.trim(), category);
      console.log("✅ addNoteDB done, navigating to notes...");
      router.replace("/(tabs)/notes");
    } catch (e: any) {
      console.error("❌ saveNote error:", e);
      Alert.alert("Save Error", e?.message ?? String(e));
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
        placeholder="Enter note title..."
        value={title}
        onChangeText={setTitle}
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.inputBorder,
            color: colors.text,
          },
        ]}
        placeholderTextColor={colors.subtext}
        autoFocus
      />

      <Text style={[styles.label, { color: colors.subtext }]}>Category</Text>
      <View style={styles.categoriesGrid}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              { backgroundColor: colors.chipBg, borderColor: colors.chipBorder },
              category === cat && {
                backgroundColor: colors.accent,
                borderColor: colors.accent,
              },
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={[
                styles.categoryChipText,
                { color: colors.text },
                category === cat && { color: "#fff" },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={saveNote}
        activeOpacity={0.85}
      >
        <Ionicons name="save-outline" size={18} color="#fff" />
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 8 },
  label: {
    fontSize: 13, fontWeight: "700",
    textTransform: "uppercase", letterSpacing: 0.8,
    marginBottom: 6, marginTop: 10,
  },
  input: { padding: 14, borderRadius: 12, fontSize: 16, borderWidth: 1 },
  categoriesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  categoryChip: {
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 20, borderWidth: 2,
  },
  categoryChipText: { fontSize: 14, fontWeight: "600" },
  button: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    padding: 16, borderRadius: 14, gap: 8, marginTop: 24,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});