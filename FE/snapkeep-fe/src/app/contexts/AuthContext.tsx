'use client'
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { clearToken, getToken, saveToken } from "../lib/auth";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedToken = getToken();
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const login = (newToken: string) => {
        saveToken(newToken);
        setToken(newToken);
    }
    const logout = () => {
        clearToken();
        setToken(null);
        router.push('/login');
    };
    return (
        <AuthContext.Provider value={({ token, login, logout })}>
            {children}
        </AuthContext.Provider>
    );
}
export default function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth cần được sử dụng với AuthProvider");
    };
    return context;
}