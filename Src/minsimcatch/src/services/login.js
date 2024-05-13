import routes from "@/routes";
import { loginInstance, instance } from "./index";
import { removeCookie, setCookie } from "./Cookie";

export const getToken = (res) => {
  const accessToken = res.data.data.accessToken;
  const accessExpiredTime = res.data.data.accessExpiredTime;
  const refreshToken = res.data.data.refreshToken;
  const refreshExpiredTime = res.data.data.refreshExpiredTime;
  localStorage.setItem("token", accessToken);
  localStorage.setItem("expiredTime", accessExpiredTime);
  localStorage.setItem("refreshExpiredTime", refreshExpiredTime);
  setCookie("refreshToken", refreshToken, refreshExpiredTime);
  return accessToken;
};

export const removeToken = () => {
  localStorage.clear();
  removeCookie("refreshToken");
  location.href = routes.login;
};

export const loginInquire = async (data) => {
  const { email, password } = data;

  const res = await instance.post(`/api/auth/login`, {
    email: email,
    password: password,
  });
  if (res.status === 200) {
    getToken(res);
  }
  return res;
};

export const refreshTokenInquire = async () => {
  try {
    const res = await loginInstance.post(`/api/auth/reissue`, null, {
      withCredentials: true,
    });
    return getToken(res);
  } catch (err) {
    alert("로그인이 만료되었습니다! 다시 로그인 해주세요.");
    removeToken();
  }
};
