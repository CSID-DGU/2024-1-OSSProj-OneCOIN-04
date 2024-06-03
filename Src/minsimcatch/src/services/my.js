import { instance } from "./index";

// 예시: 만약 이 두 함수만 필요하다면 나머지 함수는 제거
export const myInquire = () => {
  return instance.get("/users/profile");
};

export const participateInquire = () => {
  return instance.get(`/users/votes/participate`);
};

// 만약 newNameInquire와 newEmailInquire만 필요하다면 나머지를 제거할 수 있습니다.
export const newNameInquire = (payload) => {
  return instance.patch("/users/nickname", {
    nickname: payload,
  });
};

export const newEmailInquire = (payload) => {
  return instance.patch("/users/email", {
    email: payload,
  });
};
