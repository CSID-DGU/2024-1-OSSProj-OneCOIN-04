import { getDatabase, ref, query, orderByChild, equalTo, get, child, update } from "firebase/database";

// Firebase 데이터베이스 초기화
const db = getDatabase();

export const mainInquire = async (category, sort, pageParam) => {
  const mainRef = ref(db, 'votes');
  const mainQuery = query(mainRef, orderByChild('category'), equalTo(category));

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

export const closeInquire = async (id) => {
  const voteRef = child(ref(db), `votes/${id}`);
  await update(voteRef, { active: 'closed' });
  return { success: true };
};
