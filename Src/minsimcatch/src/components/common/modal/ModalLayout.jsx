import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import Loader from "@/assets/Loader";
import ModalTemplate from "./ModalTemplate";

const ModalLayout = ({ what, click }) => {
  const { id } = useParams();
  
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const surveyRef = ref(db, `surveys/${id}`); // 개선된 접근 방식: 특정 설문만 참조

    const unsubscribe = onValue(surveyRef, (snapshot) => {
      if (snapshot.exists()) {
        setDetailData({
          ...snapshot.val(),
          options: snapshot.val().options ? Object.values(snapshot.val().options) : []
        });
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
        <ModalTemplate
          detailData={detailData}
          click={click}
          what={what}
        />
      ) : (
        <div>No survey data available.</div>
      )}
    </>
  );
};

ModalLayout.propTypes = {
  what: PropTypes.string,
  click: PropTypes.func,
};

export default ModalLayout;
