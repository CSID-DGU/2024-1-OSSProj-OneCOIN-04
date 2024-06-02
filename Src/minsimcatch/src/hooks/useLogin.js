import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { isLoginInState } from "@/utils/AuthAtom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const useLogin = () => {
  const [isLoginIn, setIsLoginIn] = useRecoilState(isLoginInState);
  const [uid, setUid] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    // Firebase 인증 상태 감시
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoginIn(true);
        setUid(user.uid);
        const db = getDatabase();
        const nicknameRef = ref(db, `users/${user.uid}/nickname`);
        onValue(nicknameRef, (snapshot) => {
          setNickname(snapshot.val());
          setLoading(false); // 닉네임을 가져온 후 로딩 상태를 false로 설정
        });
      } else {
        setIsLoginIn(false);
        setUid(null);
        setNickname(null);
        setLoading(false); // 사용자 정보가 없을 경우 로딩 상태를 false로 설정
      }
    });

    return () => unsubscribe(); // 구독 해제
  }, [auth]);

  return { isLoginIn, uid, nickname, loading };
};

export default useLogin;
