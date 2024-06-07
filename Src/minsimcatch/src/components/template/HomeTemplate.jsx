import React, { useState } from "react";
import HomeLayout from "../home/HomeLayout";
import PropTypes from "prop-types";
import Modal from "../common/modal/Modal";
import ChatForm from "../common/modal/ChatForm";

const HomeTemplate = ({ datas, error, modal }) => {
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
            key={data.id}
            data={data}
            what="home"
            modal={modal}
            onCommentClick={handleOpenModal}
            disableVote={data.active === "complete"}  // 완료된 게시물에 대해 투표 비활성화
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

HomeTemplate.propTypes = {
  datas: PropTypes.array.isRequired,
  error: PropTypes.bool,
  modal: PropTypes.bool,
};

export default HomeTemplate;
