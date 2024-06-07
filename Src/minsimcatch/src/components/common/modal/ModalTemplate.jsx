import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import styled from "styled-components";
import { ModalMainContainer } from "@/styles/Container";
import ButtonLayout from "@/components/common/voteButton/ButtonLayout";
import VoteHead from "@/components/common/voteButton/VoteHead";
import MainContent from "@/components/home/MainContent";
import VoteBottom2 from "@/components/common/voteButton/VoteBottom2";
import Modal from "./Modal";
import ShareForm from "./ShareForm";
import ChatForm from "./ChatForm";

const ModalTemplate = ({ detailData, disableVote }) => {
  const {
    totalCount,
    participate,
    title,
    content,
    endDate,
    active,
    options,
    username,
    category,
    id,
    userId,
    comments = []
  } = detailData;

  const [optionState, setOptionState] = useState(options);
  const [participateState, setParticipate] = useState(participate);
  const [commentCount, setCommentCount] = useState(comments.length);

  useEffect(() => {
    setOptionState(options);
    setParticipate(participate);
    setCommentCount(comments.length);
  }, [detailData, participate, comments]);

  const auth = getAuth();
  const user = auth.currentUser;
  const isOwner = user?.uid === userId;

  const [modalVisible, setModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const shareCloseModal = () => {
    setModalVisible(false);
  };
  const shareOpenModal = () => {
    setModalVisible(true);
  };

  const closeCommentModal = () => {
    setCommentModalVisible(false);
  };
  const openCommentModal = () => {
    setCommentModalVisible(true);
  };

  const changeVotes = (participate, result) => {
    const resultData = result?.result;
    setParticipate(participate);

    const copyOptions = optionState?.map((choice, index) => {
      return {
        ...choice,
        optionCount: resultData[index]?.optionCount,
        optionRatio: resultData[index]?.optionRatio,
        choice: resultData[index].choice,
      };
    });

    setOptionState(copyOptions);
    setTotalCountState(result?.total);
  };

  return (
    <div>
      <ModalMainContainer className="modal">
        <Container>
          <VoteHead
            totalCount={totalCount}
            endDate={endDate}
            what="modal"
            username={username}
            active={active}
            isOwner={isOwner}
            categoryValue={category}
            id={id}
          />
          <MainContent title={title} content={content} />

          <ButtonLayout
            participate={participateState}
            isOwner={isOwner}
            active={active}
            options={optionState}
            voteId={id}
            isLogIn={true}
            disableVote={disableVote}
            onUpdate={changeVotes}
          />

          <VoteBottom2
            onClick={openCommentModal}
            onClickShare={shareOpenModal}
            modal={true}
            id={id}
            commentCount={commentCount}
          />
          {modalVisible && (
            <Modal
              visible={modalVisible}
              closable={true}
              maskClosable={true}
              onClose={shareCloseModal}
            >
              <ShareForm />
            </Modal>
          )}
          {commentModalVisible && (
            <Modal
              visible={commentModalVisible}
              closable={true}
              maskClosable={true}
              onClose={closeCommentModal}
            >
              <ChatForm surveyId={id} onClose={closeCommentModal} />
            </Modal>
          )}
        </Container>
      </ModalMainContainer>
    </div>
  );
};

ModalTemplate.propTypes = {
  detailData: PropTypes.object.isRequired,
  disableVote: PropTypes.bool, // 추가된 속성
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  width: 100%;
  height: auto;
  border-bottom: 2px solid #e2e2e2;
  margin-top: 1.5rem;
  padding-bottom: 1rem;
`;

export default ModalTemplate;
