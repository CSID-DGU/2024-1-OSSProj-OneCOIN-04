import { atom, selector } from "recoil";

export const titleState = atom({
  key: "titleState",
  default: "",
});

export const contentState = atom({
  key: "contentState",
  default: "",
});

export const categoryState = atom({
  key: "categoryState",
  default: "total",
});

export const timeLimitState = atom({
  key: "timeLimitState",
  default: 1440, // 기본값을 분 단위로 설정
});

export const optionState = atom({
  key: "optionState",
  default: [
    { id: 1, name: "", image: null },
    { id: 2, name: "", image: null }
  ],
});

export const uploadSelector = selector({
  key: "uploadSelector",
  get: ({ get }) => {
    return {
      title: get(titleState),
      content: get(contentState),
      category: get(categoryState),
      timeLimit: get(timeLimitState),
      options: get(optionState),
    };
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'object' && newValue !== null) {
      // newValue 객체에서 각 상태를 개별적으로 설정
      set(titleState, newValue.title);
      set(contentState, newValue.content);
      set(categoryState, newValue.category);
      set(timeLimitState, newValue.timeLimit);
      set(optionState, newValue.options);
    }
  },
});
