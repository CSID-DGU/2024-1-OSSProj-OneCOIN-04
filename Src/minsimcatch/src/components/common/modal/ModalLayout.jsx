import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDatabase, ref, onValue } from "firebase/database";
import Loader from "@/assets/Loader";
import ModalTemplate from "./ModalTemplate";

const ModalLayout = ({ id, disableVote }) => {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const surveyRef = ref(db, `surveys/${id}`);

    const unsubscribe = onValue(surveyRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDetailData({
          ...data,
          id: id,
          options: data.options ? Object.values(data.options) : [],
          comments: data.comments ? Object.values(data.comments) : [],
          totalCount: Object.values(data.options || {}).reduce((sum, option) => sum + (option.votes || 0), 0),
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : detailData ? (
        <ModalTemplate detailData={detailData} disableVote={disableVote} />
      ) : (
        <div>Survey not found.</div>
      )}
    </>
  );
};

ModalLayout.propTypes = {
  id: PropTypes.string.isRequired,
  disableVote: PropTypes.bool, // 추가된 속성
};

export default ModalLayout;
