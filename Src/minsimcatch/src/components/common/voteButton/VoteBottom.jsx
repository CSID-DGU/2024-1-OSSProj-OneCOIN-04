// src/components/common/voteButton/VoteBottom.jsx
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Icon from "../Icon";
import styled from "styled-components";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { FaShare } from "react-icons/fa";
import PropTypes from "prop-types";
import ShareForm from "@/components/common/modal/ShareForm";

/**
 * @param {object} props
 * @param {func} props.onClick - 댓글 모달
 * @param {func} props.onClickShare - 공유 버튼 모달
 * @param {boolean} props.modal - 공유 버튼 모달
 * @param {string} props.id - 투표 id
 */
const VoteBottom = ({ onClick, onClickShare, id }) => {
  const [commentCount, setCommentCount] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const commentsRef = ref(db, `surveys/${id}/comments`);

    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const comments = snapshot.val();
      const count = comments ? Object.keys(comments).length : 0;
      setCommentCount(count); // 댓글 수 설정
    });

    return () => unsubscribe();
  }, [id]);

  const handleShareClick = () => {
    setModal(true); // 공유 버튼 클릭 시 모달 열기
  };

  const handleCloseModal = () => {
    setModal(false); // 모달 닫기 함수
  };

  return (
    <>
      <VoteButtonStyle>
        <div className="chat" onClick={() => onClick(id)}>
          <Icon reverse={true} color="#676767" size="20px">
            <HiOutlineChatBubbleOvalLeft />
          </Icon>
          <p>댓글({commentCount})</p>
        </div>
        <Icon color="#676767" size="20px" onClick={handleShareClick}>
          <FaShare />
        </Icon>
      </VoteButtonStyle>
      {modal && (
        <ModalOverlay>
          <ModalContent>
            <ShareForm id={id} />
            <CloseButton onClick={handleCloseModal}>닫기</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

VoteBottom.propTypes = {
  onClickShare: PropTypes.func,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
};

const VoteButtonStyle = styled.div`
  margin-top: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .chat {
    display: flex;
    align-items: center;
  }
  p {
    margin-left: 0.3rem;
    font-size: 11.5px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ccc;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

export default VoteBottom;
