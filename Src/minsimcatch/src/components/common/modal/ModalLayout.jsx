import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDatabase, ref, onValue } from "firebase/database";
import Loader from "@/assets/Loader";
import ModalTemplate from "./ModalTemplate";

const ModalLayout = ({ id }) => {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const surveyRef = ref(db, `surveys/${id}`);

    const unsubscribe = onValue(surveyRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Survey data:', data); // 데이터 확인용
        setDetailData({
          ...data,
          id: id,  // id를 detailData에 포함
          options: data.options ? Object.values(data.options) : [],
          comments: data.comments ? Object.values(data.comments) : [] // 댓글 추가
        });
        setError(null);
      } else {
        setError("Survey not found");
        setDetailData(null);
      }
      setLoading(false);
    }, (error) => {
      setError(`Error loading data: ${error.message}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    console.log('ModalLayout ID:', id); // ID 확인용 로그 추가
    console.log('ModalLayout detailData:', detailData); // detailData 확인용 로그 추가
  }, [id, detailData]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : detailData ? (
        <ModalTemplate detailData={detailData} />
      ) : (
        <div>Survey not found.</div>
      )}
    </>
  );
};

ModalLayout.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ModalLayout;
