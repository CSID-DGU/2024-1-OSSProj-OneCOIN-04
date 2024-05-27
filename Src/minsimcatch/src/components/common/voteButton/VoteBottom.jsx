import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Icon from "../Icon";
import styled from "styled-components";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { FaShare } from "react-icons/fa";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {func} props.onClick - 댓글 모달
 * @param {func} props.onClickShare - 공유 버튼 모달
 * @param {boolean} props.modal - 공유 버튼 모달
 * @param {string} props.id - 투표 id
 */

const VoteBottom = ({ onClick, onClickShare, modal, id }) => {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const commentsRef = ref(db, `surveys/${id}/comments`);

    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const comments = snapshot.val();
      const count = comments ? Object.keys(comments).length : 0;
      setCommentCount(count);
    });

    return () => unsubscribe();
  }, [id]);

  return (
    <VoteButtonStyle>
      <div className="chat" onClick={() => onClick(id)}>
        <Icon reverse={true} color="#676767" size="20px">
          <HiOutlineChatBubbleOvalLeft />
        </Icon>
        <p>댓글({commentCount})</p>
      </div>
      <Icon color="#676767" size="20px" onClick={onClickShare} modal={modal}>
        <FaShare />
      </Icon>
    </VoteButtonStyle>
  );
};

VoteBottom.propTypes = {
  onClickShare: PropTypes.func,
  onClick: PropTypes.func,
  modal: PropTypes.bool,
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

export default VoteBottom;
