import PropTypes from "prop-types";
import Chat from "./Chat";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Alert from "../Alert";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import Swal from "sweetalert2";
import useLogin from "@/hooks/useLogin";

const ChatForm = ({ surveyId, onClose }) => {
  const [write, setWrite] = useState("");
  const [alert, setIsAlert] = useState(false);
  const [comments, setComments] = useState([]);
  const [participate, setParticipate] = useState(false);
  const { uid, nickname } = useLogin();
  const db = getDatabase();

  useEffect(() => {
    const commentsRef = ref(db, `surveys/${surveyId}/comments`);
    const participateRef = ref(db, `user_votes/${uid}/${surveyId}`);

    const unsubscribeComments = onValue(commentsRef, (snapshot) => {
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

    const unsubscribeParticipate = onValue(participateRef, (snapshot) => {
      setParticipate(!!snapshot.exists());
    });

    return () => {
      unsubscribeComments();
      unsubscribeParticipate();
    };
  }, [db, surveyId, uid]);

  const handleUpload = () => {
    if (participate) {
      const commentsRef = ref(db, `surveys/${surveyId}/comments`);
      push(commentsRef, {
        content: write,
        username: nickname || uid,
        createTime: new Date().toISOString(),
      });
      setWrite("");
    } else {
      setIsAlert(true);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      handleUpload();
    }
  };

  const handleInputChange = (event) => setWrite(event.target.value);

  const handleClick = (commentId) => {
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
        const commentRef = ref(db, `surveys/${surveyId}/comments/${commentId}`);
        remove(commentRef).catch((err) => {
          alert(err);
        });
      }
    });
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <button onClick={onClose}>X</button>
      </ModalHeader>
      <ModalContent>
        <CommentList>
          {comments.map((comment) => (
            <Chat
              key={comment.id}
              data={comment}
              onClick={handleClick}
              isOwner={comment.username === (nickname || uid)}
            />
          ))}
        </CommentList>
        <FormStyled>
          <WriteStyled>
            {alert && (
              <Alert setIsAlert={setIsAlert} positionLeft={`5%`}>
                투표를 해야 댓글 작성이 가능합니다.
              </Alert>
            )}
            <input
              placeholder="댓글 작성"
              onChange={handleInputChange}
              onKeyDown={handleEnterKey}
              value={write}
            />
            <UploadStyled onClick={handleUpload}>게시</UploadStyled>
          </WriteStyled>
        </FormStyled>
      </ModalContent>
    </ModalContainer>
  );
};

ChatForm.propTypes = {
  surveyId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 500px;
`;

const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  margin-bottom: 10px;
`;

const FormStyled = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  margin-top: 10px;
`;

const WriteStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid #9eb0ea;
  border-radius: 72px;
  background-color: #fff;
  padding: 10px;

  input {
    flex: 1;
    border: none;
    background-color: #fff;
    font-weight: 400;
    font-size: 14px;
    color: #000;
    &:focus {
      outline: none;
    }
  }
`;

const UploadStyled = styled.button`
  width: 60px;
  font-weight: 500;
  font-size: 14px;
  color: #2955c5;
  border: none;
  background-color: #fff;
  cursor: pointer;
`;

export default ChatForm;
