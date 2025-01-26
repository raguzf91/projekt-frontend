// src/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: number
    email: string
    role: string
}
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
};

// Create the context with default undefined to enforce use within the provider
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
