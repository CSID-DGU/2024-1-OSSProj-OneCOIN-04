import { getDatabase, ref, query, orderByChild, equalTo, get, child, update } from "firebase/database";

// Firebase 데이터베이스 초기화
const db = getDatabase();

export const mainInquire = async (categoryData, pageParam) => {
  const { sort, content } = categoryData;
  const mainRef = ref(db, 'votes');
  const mainQuery = query(mainRef, orderByChild('category'), equalTo(content));

  const snapshot = await get(mainQuery);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const sortedData = Object.keys(data).map(key => ({ id: key, ...data[key] }))
      .sort((a, b) => a[sort] > b[sort] ? 1 : -1)  // 정렬
      .slice(pageParam * 10, (pageParam + 1) * 10); // 페이지네이션
    return { data: sortedData, isLast: sortedData.length < 10 };
  } else {
    return { data: [], isLast: true };
  }
};

export const hotInquire = async (pageParam) => {
  const hotRef = ref(db, 'votes');
  const hotQuery = query(hotRef, orderByChild('hot'), equalTo(true));

  const snapshot = await get(hotQuery);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const hotData = Object.keys(data).map(key => ({ id: key, ...data[key] }))
      .slice(pageParam * 10, (pageParam + 1) * 10); // 페이지네이션
    return { data: hotData, isLast: hotData.length < 10 };
  } else {
    return { data: [], isLast: true };
  }
};

export const completeInquire = async (categoryData, pageParam) => {
  const { sort, content } = categoryData;
  const completeRef = ref(db, 'votes');
  const completeQuery = query(completeRef, orderByChild('active'), equalTo('complete'));

  const snapshot = await get(completeQuery);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const filteredData = Object.keys(data).map(key => ({ id: key, ...data[key] }))
      .filter(item => item.category === content) // 카테고리 필터링
      .sort((a, b) => a[sort] > b[sort] ? 1 : -1)  // 정렬
      .slice(pageParam * 10, (pageParam + 1) * 10); // 페이지네이션
    return { data: filteredData, isLast: filteredData.length < 10 };
  } else {
    return { data: [], isLast: true };
  }
};

export const commentCountInquire = async (id) => {
  const commentsRef = ref(db, `votes/${id}/comments`);
  const snapshot = await get(commentsRef);
  if (snapshot.exists()) {
    const comments = snapshot.val();
    return { count: Object.keys(comments).length };
  } else {
    return { count: 0 };
  }
};

export const detailInquire = async (id) => {
  const detailRef = ref(db, `votes/${id}`);
  const snapshot = await get(detailRef);
  if (snapshot.exists()) {
    return { data: snapshot.val() };
  } else {
    return { data: null };
  }
};

export const ChatInquire = async (id) => {
  const commentsRef = ref(db, `votes/${id}/comments`);
  const snapshot = await get(commentsRef);
  if (snapshot.exists()) {
    const comments = snapshot.val();
    const commentsArray = Object.keys(comments).map(key => ({ id: key, ...comments[key] }));
    return { data: commentsArray };
  } else {
    return { data: [] };
  }
};

export const closeInquire = async (id) => {
  const voteRef = child(ref(db), `votes/${id}`);
  await update(voteRef, { active: 'closed' });
  return { success: true };
};
