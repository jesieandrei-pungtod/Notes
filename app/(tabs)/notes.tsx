import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert, FlatList, StyleSheet, Text,
  TouchableOpacity, View,
} from "react-native";
import { deleteNoteDB, getNotes, Note } from "../../lib/database";
import { notesEventEmitter } from "../../lib/noteEvents";

console.log("📦 notes.tsx module loaded");

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { colors } = useTheme();

  const loadNotes = useCallback(() => {
    console.log("🔁 loadNotes called");
    try {
      const rows = getNotes();
      console.log("✅ rows fetched:", JSON.stringify(rows));
      setNotes([...rows]);
    } catch (e) {
      console.error("❌ loadNotes error:", e);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    console.log("👁 screen focused — loading notes");
    loadNotes();
  }, [loadNotes]));

  useEffect(() => {
    console.log("📡 subscribing to notesEventEmitter");
    const unsubscribe = notesEventEmitter.subscribe(() => {
      console.log("📣 emitter fired in notes screen!");
      loadNotes();
    });
    return () => {
      console.log("🔌 notes screen unsubscribed");
      unsubscribe();
    };
  }, [loadNotes]);

  const handleDelete = (id: number) => {
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          try {
            console.log("🗑 deleting note id:", id);
            deleteNoteDB(id);
          } catch {
            Alert.alert("Error", "Failed to delete note");
          }
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.header, { color: colors.text }]}>My Notes</Text>

      {notes.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={64} color={colors.subtext} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No notes yet</Text>
          <Text style={[styles.emptySubtitle, { color: colors.subtext }]}>
            Tap + to create your first note
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item, index) =>
            item.id != null ? item.id.toString() : index.toString()
          }
          extraData={notes}
          contentContainerStyle={{ paddingBottom: 100 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.inputBorder },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/task-detail",
                  params: { id: item.id, title: item.title, category: item.category },
                })
              }
              activeOpacity={0.85}
            >
              <View style={[styles.avatar, { backgroundColor: colors.accentGlow }]}>
                <Text style={[styles.avatarText, { color: colors.accent }]}>
                  {item.title?.charAt(0).toUpperCase() ?? "?"}
                </Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={[styles.badge, { backgroundColor: colors.accentGlow }]}>
                  <Text style={[styles.badgeText, { color: colors.accent }]}>
                    {item.category}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={[styles.deleteBtn, { backgroundColor: colors.deleteBg }]}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.accent }]}
        onPress={() => router.push("/add-task")}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 28, fontWeight: "800", marginBottom: 16, marginTop: 8 },
  emptyState: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  emptyTitle: { fontSize: 20, fontWeight: "700", marginTop: 12 },
  emptySubtitle: { fontSize: 14, textAlign: "center" },
  card: {
    flexDirection: "row", alignItems: "center",
    borderRadius: 16, padding: 14, gap: 12, borderWidth: 1,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 18, fontWeight: "700" },
  cardBody: { flex: 1, gap: 6 },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  badge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: "700" },
  deleteBtn: { padding: 6, borderRadius: 10 },
  fab: {
    position: "absolute", bottom: 24, right: 24,
    width: 56, height: 56, borderRadius: 28,
    justifyContent: "center", alignItems: "center",
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 6,
  },
});