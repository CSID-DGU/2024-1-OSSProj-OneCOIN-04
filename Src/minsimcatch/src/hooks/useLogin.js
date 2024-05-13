import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { isLoginInState } from "@/utils/AuthAtom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { refreshTokenInquire, removeToken } from "@/services/login";

const useLogin = () => {
  const [isLoginIn, setIsLoginIn] = useRecoilState(isLoginInState);
  const [uid, setUid] = useState(null);
  const auth = getAuth();

  const accessToken = localStorage.getItem("token");
  const expiredTime = new Date(parseInt(localStorage.getItem("expiredTime"))); // accessToken 만료 시간
  const refreshExpiredTime = new Date(parseInt(localStorage.getItem("refreshExpiredTime")));
  const currentTime = new Date();

  useEffect(() => {
    // Firebase 인증 상태 감시
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoginIn(true);
        setUid(user.uid);
      } else {
        setIsLoginIn(false);
        setUid(null);
      }
    });

    return () => unsubscribe(); // 구독 해제
  }, [auth]);

  // 기존 토큰 기반 인증 상태 관리 로직 유지
  useEffect(() => {
    if (accessToken && expiredTime > currentTime) {
      setIsLoginIn(true);
    } else if (accessToken && expiredTime < currentTime && refreshExpiredTime > currentTime) {
      setIsLoginIn(true);
      refreshTokenInquire();
    } else if (refreshExpiredTime < currentTime) {
      setIsLoginIn(false);
      removeToken();
    }
  }, [accessToken, expiredTime, refreshExpiredTime, currentTime]);

  return { isLoginIn, uid };
};

export default useLogin;
