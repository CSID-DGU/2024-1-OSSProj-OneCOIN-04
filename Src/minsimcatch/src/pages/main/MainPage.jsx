import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import useLogin from '@/hooks/useLogin';
import Main from "@/components/layouts/headers/Main";
import Footer from "@/components/layouts/footers/Footer";
import HomeTemplate from "@/components/template/HomeTemplate";
import Loader from "@/assets/Loader";
import ErrorScreen from "@/components/common/ErrorScreen";
import NonePage from "@/components/common/NonePage";
import styled from "styled-components";

const MainPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);  // 모달 상태 추가
  const { isLoginIn, uid } = useLogin();  // 로그인 상태와 UID 확인

  useEffect(() => {
    const db = getDatabase();
    const surveysRef = ref(db, 'surveys');
  
    const unsubscribe = onValue(surveysRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const surveysArray = Object.entries(data).map(([id, survey]) => {
          const optionsObject = survey.options || {};
          const optionsArray = Object.entries(optionsObject).map(([optionId, optionDetails]) => ({
            id: optionId,
            ...optionDetails
          }));
          const totalCount = optionsArray.reduce((sum, option) => sum + (option.votes || 0), 0);  // votes 합계 계산
          return {
            id,
            ...survey,
            options: optionsArray,
            totalCount // 총 votes 수 추가
          };
        });
        setSurveys(surveysArray);
      } else {
        setError('No surveys available.');
      }
      setLoading(false);
    }, (error) => {
      console.error("Error loading data:", error);
      setError(`Error loading data: ${error.message}`);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  
  // 데이터 로딩 후 확인
  useEffect(() => {
    console.log('Surveys loaded:', surveys);
  }, [surveys]);

  console.log('Is user logged in:', isLoginIn, 'UID:', uid);  // 사용자 로그인 상태와 UID 출력
  
  return (
    <>
      <Main page="main" />
      <ContentWrapper>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorScreen error="Error loading surveys" />
        ) : surveys.length === 0 ? (
          <NonePage what="content" />
        ) : (
          <HomeTemplate datas={surveys} error={error} modal={modal} />
        )}
      </ContentWrapper>
      <Footer page="main" />
    </>
  );
};

export default MainPage;

const ContentWrapper = styled.div`
  padding-bottom: 80px; // Footer 높이만큼 패딩 추가
  min-height: calc(100vh - 60px); // Footer와 헤더를 뺀 높이 계산
  box-sizing: border-box; // Padding과 border를 포함한 box-sizing
`;
