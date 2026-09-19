import { useCallback, useEffect, useState } from "react";
import type { CategoryId } from "./waste-data";

export type ScanRecord = {
  id: string;
  createdAt: string;
  category: CategoryId;
  label: string;
  mode: "Demo" | "Simulated";
  confidence: number;
  disposalStatus: "Guidance shown" | "Disposed";
};

export type QuizRecord = {
  id: string;
  name: string;
  score: number;
  total: number;
  createdAt: string;
};

export type ReportRecord = {
  id: string;
  issueType: string;
  location: string;
  description: string;
  reporter: string;
  anonymous: boolean;
  image?: string;
  status: "Reported" | "Under Review" | "Resolved";
  createdAt: string;
};

export const KEYS = {
  scans: "ecosort.scans",
  quiz: "ecosort.quiz",
  reports: "ecosort.reports",
} as const;

export function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function writeList<T>(key: string, value: T[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("ecosort:storage", { detail: key }));
  } catch {
    /* storage unavailable */
  }
}

export function pushRecord<T>(key: string, record: T) {
  writeList(key, [record, ...readList<T>(key)]);
}

export function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Hydration-safe localStorage list hook. Returns [] during SSR/first paint. */
export function useStoredList<T>(key: string) {
  const [items, setItems] = useState<T[]>([]);
  const [ready, setReady] = useState(false);

  const sync = useCallback(() => setItems(readList<T>(key)), [key]);

  useEffect(() => {
    sync();
    setReady(true);
    const onChange = () => sync();
    window.addEventListener("ecosort:storage", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("ecosort:storage", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [sync]);

  const add = useCallback(
    (record: T) => {
      pushRecord(key, record);
      sync();
    },
    [key, sync],
  );

  const replace = useCallback(
    (next: T[]) => {
      writeList(key, next);
      sync();
    },
    [key, sync],
  );

  const clear = useCallback(() => replace([]), [replace]);

  return { items, ready, add, replace, clear };
}
