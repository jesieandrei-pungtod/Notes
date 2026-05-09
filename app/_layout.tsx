import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { initDB } from "../lib/database";

export default function Layout() {
  const [dbReady, setDbReady] = useState(false);

 useEffect(() => {
  try {
    initDB(); // ← temporary, wipes and recreates table with correct schema
    console.log("✅ DB ready");
  } catch (e) {
    console.error("❌ DB setup error:", e);
  } finally {
    setDbReady(true);
  }
}, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="task-detail" options={{ headerShown: true, title: "Note Details" }} />
        <Stack.Screen name="add-task" options={{ headerShown: true, title: "Add Note" }} />
        <Stack.Screen name="edit-task" options={{ headerShown: true, title: "Edit Note" }} />
      </Stack>
    </ThemeProvider>
  );
}