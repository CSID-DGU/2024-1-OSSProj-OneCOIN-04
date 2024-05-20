import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MainContainer } from "@/styles/Container";
import ButtonLayout from "../common/voteButton/ButtonLayout";
import VoteHead from "../common/voteButton/VoteHead";
import MainContent from "./MainContent";
import VoteBottom from "../common/voteButton/VoteBottom";

const HomeLayout = ({ data, what, route, modal, onCommentClick }) => {
  const {
    totalCount,
    participate,
    isOwner,
    title,
    content,
    endDate,
    active,
    options,
    username,
    category,
    id,
  } = data;

  const changeVotes = (participate, result) => {
    const resultData = result?.result;

    const updatedOptions = options.map((choice, index) => ({
      ...choice,
      optionCount: resultData[index]?.optionCount,
      optionRatio: resultData[index]?.optionRatio,
      choice: resultData[index]?.choice,
    }));

    setOptionState(updatedOptions);
    setTotalCountState(result?.total);
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

        <ButtonLayout
          participate={participate}
          isOwner={isOwner}
          active={active}
          options={options}
          changeVotes={changeVotes}
          voteId={id}
          isLogIn={true} // Assume user is logged in for now
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

export default HomeLayout;
