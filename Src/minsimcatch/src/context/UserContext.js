// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const auth = getAuth();  // Firebase auth 인스턴스를 가져옵니다.

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);  // setUser를 직접 사용
        return unsubscribe;  // 구독 해제
    }, []);

    const logout = async () => {
        await signOut(auth);
        setUser(null);  // 로그아웃 후 사용자 상태를 null로 설정
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
