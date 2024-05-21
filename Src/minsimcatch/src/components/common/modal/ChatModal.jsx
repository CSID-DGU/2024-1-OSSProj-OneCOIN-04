import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "./Modal";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { useParams } from "react-router";
import useLogin from "@/hooks/useLogin";
import Swal from "sweetalert2";

const ChatModal = ({ surveyId, visible, onClose }) => {
  const { isLoginIn, uid, nickname } = useLogin();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (surveyId) {
      const db = getDatabase();
      const commentsRef = ref(db, `surveys/${surveyId}/comments`);

      const unsubscribe = onValue(commentsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const commentsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setComments(commentsArray);
        } else {
          setComments([]);
        }
      });

      return () => unsubscribe();
    }
  }, [surveyId]);

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = () => {
    if (!isLoginIn) {
      Swal.fire("로그인이 필요합니다.");
      return;
    }

    if (!comment.trim()) return;

    const db = getDatabase();
    const commentRef = ref(db, `surveys/${surveyId}/comments`);

    push(commentRef, {
      content: comment,
      createTime: new Date().toISOString(),
      username: nickname,
      uid,
    }).then(() => setComment(""));
  };

  const handleCommentDelete = (commentId) => {
    const db = getDatabase();
    const commentRef = ref(db, `surveys/${surveyId}/comments/${commentId}`);

    Swal.fire({
      icon: "info",
      html: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      confirmButtonColor: "#429f50",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(commentRef)
          .then(() => Swal.fire("삭제되었습니다."))
          .catch((err) => Swal.fire("삭제에 실패했습니다.", err.message, "error"));
      }
    });
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <ChatContainer>
        <CommentsList>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <p>{comment.username}</p>
              <p>{comment.content}</p>
              <p>{new Date(comment.createTime).toLocaleString()}</p>
              {comment.uid === uid && (
                <DeleteButton onClick={() => handleCommentDelete(comment.id)}>
                  삭제
                </DeleteButton>
              )}
            </Comment>
          ))}
        </CommentsList>
        <CommentInput>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="댓글 작성"
          />
          <button onClick={handleCommentSubmit}>게시</button>
        </CommentInput>
      </ChatContainer>
    </Modal>
  );
};

ChatModal.propTypes = {
  surveyId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentsList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const Comment = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

const CommentInput = styled.div`
  display: flex;
  input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ddd;
  }
  button {
    padding: 10px;
    border: none;
    background-color: #2955c5;
    color: white;
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #e45151;
  cursor: pointer;
`;

export default ChatModal;
