import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MainContainer } from "@/styles/Container";
import ButtonLayout from "../common/voteButton/ButtonLayout";
import VoteHead from "../common/voteButton/VoteHead";
import MainContent from "./MainContent";
import VoteBottom from "../common/voteButton/VoteBottom";
import { getDatabase, ref, update } from "firebase/database";
import Swal from "sweetalert2";
import useLogin from '@/hooks/useLogin';

const HomeLayout = ({ data, what, route, modal, onCommentClick, disableVote }) => {
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
  } = data;

  const { uid } = useLogin();
  const isOwner = disableVote ? false : uid === userId; // CompletePage에서 disableVote가 true이면 isOwner를 false로 설정

  const handleEndVote = () => {
    const db = getDatabase();
    const surveyRef = ref(db, `surveys/${id}`);
    update(surveyRef, { active: "complete" })
      .then(() => {
        console.log("Vote ended successfully.");
      })
      .catch((error) => {
        console.error("Error ending vote: ", error);
      });
  };

  const confirmEndVote = () => {
    Swal.fire({
      title: "투표를 종료하시겠습니까?",
      text: "한 번 종료하면 다시 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네, 종료합니다!",
      cancelButtonText: "아니요, 취소합니다",
    }).then((result) => {
      if (result.isConfirmed) {
        handleEndVote();
        Swal.fire("종료되었습니다!", "투표가 종료되었습니다.", "success");
      }
    });
  };

  const handleUpdate = () => {
    // 여기에 데이터 업데이트 후 UI를 갱신하는 로직을 추가
    // 예: setTotalCount(...); setOptions(...);
  };

  return (
    <MainContainer>
      <Container>
        <VoteHead
          totalCount={totalCount}
          endDate={endDate}
          what={what}
          username={username}
          active={active}
          isOwner={isOwner}
          categoryValue={category}
          id={id}
        />
        <MainContent title={title} content={content} />

        {isOwner && active !== "complete" && (
          <EndVoteButton onClick={confirmEndVote}>투표 종료</EndVoteButton>
        )}

        <ButtonLayout
          participate={participate}
          isOwner={isOwner}
          active={active}
          options={options}
          voteId={id}
          isLogIn={true}
          disableVote={disableVote}
          onUpdate={handleUpdate} // Update 함수 전달
        />

        <VoteBottom
          onClick={() => onCommentClick(id)}
          onClickShare={() => {}}
          modal={modal}
          id={id}
        />
      </Container>
    </MainContainer>
  );
};

HomeLayout.propTypes = {
  data: PropTypes.object.isRequired,
  what: PropTypes.string,
  route: PropTypes.string,
  modal: PropTypes.bool,
  onCommentClick: PropTypes.func.isRequired,
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

const EndVoteButton = styled.button`
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  cursor: pointer;
`;

export default HomeLayout;
