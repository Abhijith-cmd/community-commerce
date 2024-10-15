// src/context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
     const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
