import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Palette } from "@/styles/Palette";
import { useRecoilState, useResetRecoilState } from "recoil";
import { uploadSelector } from "@/utils/UploadAtom";
import { auth, database } from '@/firebase-config';
import { getDatabase, ref, push, set, serverTimestamp } from 'firebase/database';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import routes from "@/routes";

const UploadButton = () => {
  const navigate = useNavigate();
  const [count, setCount] = useRecoilState(uploadSelector);
  const resetList = useResetRecoilState(uploadSelector);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isEmpty = count.options.some(option => option.name === "");
    setActive(count.title && count.options.length > 1 && !isEmpty);
  }, [count]);

  const uploadSurvey = async () => {
    if (!active) {
      Swal.fire("필요한 정보를 모두 입력해주세요.");
      return;
    }
  
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
      Swal.fire("로그인이 필요합니다.");
      return;
    }
  
    const db = getDatabase();
    const newSurveyRef = push(ref(db, 'surveys')); // 설문에 대한 고유 ID 생성
    const surveyId = newSurveyRef.key;
  
    // 옵션 객체 초기화
    let optionsObject = {};
  
    for (let option of count.options) {
      const optionId = push(ref(db, `surveys/${surveyId}/options`)).key;
      optionsObject[optionId] = {
        name: option.name,
        votes: 0
      };
      await set(ref(db, `surveys/${surveyId}/options/${optionId}`), optionsObject[optionId]);
    }
  
    const newSurveyData = {
      title: count.title,
      content: count.content,
      options: optionsObject, // 옵션 객체로 저장
      userId,
      timestamp: serverTimestamp()
    };
  
    await set(newSurveyRef, newSurveyData); // 전체 설문 데이터베이스에 저장
    Swal.fire("업로드 완료").then(() => {
      resetList();
      navigate(routes.home);
    });
  };
  
  
  

  return (
    <>
      <UploadButtonStyle active={active}>
        <button className="uploadBtn" onClick={uploadSurvey}>등록</button>
      </UploadButtonStyle>
    </>
  );
};

const UploadButtonStyle = styled.div`
  .uploadBtn {
    background-color: ${prop =>
      prop.active ? Palette["button_blue"] : Palette["percent_gray"]};
    color: ${prop => (prop.active ? "#FFFFFF" : "#000000")};
    width: 100%;
    max-width: 450px;
    height: 60px;
    font-size: 19px;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  display: flex;
  width: 100%;
  max-width: 450px;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  z-index: 100000;
`;

export default UploadButton;