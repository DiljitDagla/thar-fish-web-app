"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AuthUser, Role } from "./types";

interface Credential {
  email: string;
  password: string;
  user: AuthUser;
}

const ACCOUNTS: Credential[] = [
  {
    email: "admin@tharfish.com",
    password: "admin123",
    user: {
      name: "Rajveer Rathore",
      email: "admin@tharfish.com",
      role: "admin",
      avatar: "RR",
    },
  },
  {
    email: "user@tharfish.com",
    password: "user123",
    user: {
      name: "Vikram Singh",
      email: "user@tharfish.com",
      role: "user",
      avatar: "VS",
    },
  },
];

const STORAGE_KEY = "tharfish_session";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => { ok: boolean; role?: Role; error?: string };
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const login = React.useCallback((email: string, password: string) => {
    const match = ACCOUNTS.find(
      (a) => a.email === email.trim().toLowerCase() && a.password === password
    );
    if (!match) {
      return { ok: false, error: "Invalid email or password" };
    }
    setUser(match.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(match.user));
    return { ok: true, role: match.user.role };
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
