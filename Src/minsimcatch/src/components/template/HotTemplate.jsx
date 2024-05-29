import React, { useState, useEffect } from "react";
import HomeLayout from "../home/HomeLayout";
import routes from "@/routes";
import PropTypes from "prop-types";
import Modal from "../common/modal/Modal";
import ChatForm from "../common/modal/ChatForm";

const HotTemplate = ({ datas, isFetching, modal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSurveyId, setCurrentSurveyId] = useState(null);

  const handleOpenModal = (surveyId) => {
    setCurrentSurveyId(surveyId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSurveyId(null);
  };

  useEffect(() => {
    console.log("Received data in HotTemplate:", datas);
  }, [datas]);

  return (
    <div>
      {isFetching ? (
        <div>Loading...</div>
      ) : datas.length === 0 ? (
        <>인기 게시물이 없습니다.</>
      ) : (
        datas.map((data) => (
          <HomeLayout
            key={data.id} // 각 데이터의 고유 ID를 키 값으로 사용
            data={data}
            what="hot"
            route={routes.hot}
            modal={modal}
            onCommentClick={handleOpenModal}
          />
        ))
      )}
      {isModalOpen && (
        <Modal visible={isModalOpen} onClose={handleCloseModal}>
          <ChatForm
            participate={datas.find((data) => data.id === currentSurveyId).participate}
            surveyId={currentSurveyId}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

HotTemplate.propTypes = {
  datas: PropTypes.array.isRequired, // 데이터 배열
  isFetching: PropTypes.bool.isRequired, // 데이터 로딩 여부
  modal: PropTypes.bool, // 모달 상태
};

export default HotTemplate;
