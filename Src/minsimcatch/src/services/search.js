import { getDatabase, ref, get } from "firebase/database";

export const fetchSurveys = async () => {
  const db = getDatabase();
  const surveysRef = ref(db, 'surveys');
  const snapshot = await get(surveysRef);

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};
