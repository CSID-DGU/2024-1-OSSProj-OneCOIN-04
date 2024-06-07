import { atom, selector } from "recoil";

// 메인페이지
export const sortState = atom({
  key: "sortState",
  default: "latest",
});

export const sortNameState = atom({
  key: "sortNameState",
  default: "최신순",
});

export const segmentState = atom({
  key: "segmentState",
  default: "total",
});

export const segmentNameState = atom({
  key: "segmentNameState",
  default: "골라줘(전체)",
});

export const totalCategoryState = selector({
  key: "totalCategoryState",
  get: ({ get }) => {
    return {
      sort: get(sortState),
      content: get(segmentState),
    };
  },
});

// 완료된 페이지
export const completeSortState = atom({
  key: "completeSortState",
  default: "latest",
});

export const completeSortNameState = atom({
  key: "completeSortNameState",
  default: "최신순",
});

export const completeSegmentState = atom({
  key: "completeSegmentState",
  default: "total",
});

export const completeSegmentNameState = atom({
  key: "completeSegmentNameState",
  default: "골라줘(전체)",
});

export const completeTotalCategoryState = selector({
  key: "completeTotalCategoryState",
  get: ({ get }) => {
    return {
      sort: get(completeSortState),
      content: get(completeSegmentState),
    };
  },
});
