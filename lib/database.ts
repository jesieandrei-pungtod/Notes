import * as SQLite from "expo-sqlite";
import { notesEventEmitter } from "./noteEvents";

const db = SQLite.openDatabaseSync("notes.db");

export interface Note {
  id: number;
  title: string;
  category: string;
  content: string;
  createdAt: string;
}

export const initDB = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        content TEXT DEFAULT '',
        createdAt TEXT DEFAULT (datetime('now'))
      );
    `);
    console.log("✅ DB initialized");
  } catch (e) {
    console.error("❌ DB init failed:", e);
    throw e;
  }
};

export const resetDB = () => {
  db.execSync("DROP TABLE IF EXISTS notes;");
  initDB();
};

export const getNotes = (): Note[] => {
  try {
    const rows = db.getAllSync(
      "SELECT * FROM notes WHERE id IS NOT NULL ORDER BY id DESC;"
    ) as Note[];
    console.log("📋 getNotes count:", rows.length);
    return rows;
  } catch (e) {
    console.error("❌ getNotes failed:", e);
    return [];
  }
};

export const addNoteDB = (title: string, category: string, content: string = ""): void => {
  if (!title || !category) throw new Error("Title and category are required");
  try {
    db.runSync(
      "INSERT INTO notes (title, category, content, createdAt) VALUES (?, ?, ?, datetime('now'));",
      [title, category, content]
    );
    console.log("✅ Note inserted:", title, category);
    notesEventEmitter.emit();
  } catch (e) {
    console.error("❌ addNoteDB failed:", e);
    throw e;
  }
};

export const updateNoteDB = (id: number, title: string, category: string, content: string = ""): void => {
  try {
    db.runSync(
      "UPDATE notes SET title = ?, category = ?, content = ? WHERE id = ?;",
      [title, category, content, id]
    );
    console.log("✅ Note updated:", id);
    notesEventEmitter.emit();
  } catch (e) {
    console.error("❌ updateNoteDB failed:", e);
    throw e;
  }
};

export const deleteNoteDB = (id: number): void => {
  try {
    db.runSync("DELETE FROM notes WHERE id = ?;", [id]);
    console.log("✅ Note deleted:", id);
    notesEventEmitter.emit();
  } catch (e) {
    console.error("❌ deleteNoteDB failed:", e);
    throw e;
  }
};