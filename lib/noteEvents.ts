type Listener = () => void;

const listeners = new Set<Listener>();

export const notesEventEmitter = {
  emit() {
    console.log("📣 notesEventEmitter.emit() called, listeners:", listeners.size);
    listeners.forEach((fn) => fn());
  },
  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    console.log("📡 subscribed, total listeners:", listeners.size);
    return () => {
      listeners.delete(fn);
      console.log("🔌 unsubscribed, total listeners:", listeners.size);
    };
  },
};