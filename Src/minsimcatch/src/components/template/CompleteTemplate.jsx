import React, { useState } from "react";
import HomeLayout from "../home/HomeLayout";
import routes from "@/routes";
import PropTypes from "prop-types";
import Modal from "../common/modal/Modal";
import ChatForm from "../common/modal/ChatForm";

const CompleteTemplate = ({ datas, error, modal }) => {
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

  return (
    <div>
      {error ? (
        <>글이 없어용</>
      ) : (
        datas &&
        datas.map((data) => (
          <HomeLayout
            key={data.id} // 각 데이터의 고유 ID를 키 값으로 사용
            data={{ ...data, active: "complete" }} // 투표 종료 상태로 설정
            what="complete"
            route={routes.complete}
            modal={modal}
            onCommentClick={handleOpenModal}
            disableVote={true} // 투표 버튼 비활성화 플래그 추가
            isOwner={false} // CompletePage에서 isOwner를 무시
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

CompleteTemplate.propTypes = {
  datas: PropTypes.array.isRequired, // 데이터 배열
  error: PropTypes.bool, // 에러 여부
  modal: PropTypes.bool, // 모달 상태
};

export default CompleteTemplate;
