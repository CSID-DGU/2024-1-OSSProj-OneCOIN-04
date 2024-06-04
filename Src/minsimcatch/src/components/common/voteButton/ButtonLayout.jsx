import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MainButton from "./MainButton";

const ButtonLayout = ({
  options,
  participate,
  isOwner,
  active,
  voteId,
  disableVote,
  isLogIn,
  onUpdate // 추가된 속성
}) => {
  const optionsArray = Array.isArray(options) ? options : Object.entries(options).map(([id, option]) => ({ id, ...option }));

  return (
    <Container>
      {optionsArray.map((option) => (
        <MainButton
          key={option.id}
          id={option.id}
          name={option.name}
          value={option.percentage}
          number={option.votes}
          participate={participate}
          isOwner={isOwner}
          active={active}
          voteId={voteId}
          disableVote={disableVote}
          isLogIn={isLogIn}
          onUpdate={onUpdate} // Update 함수 전달
        />
      ))}
    </Container>
  );
};

ButtonLayout.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  participate: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  active: PropTypes.string.isRequired,
  voteId: PropTypes.string.isRequired,
  disableVote: PropTypes.bool,
  isLogIn: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func // 추가된 속성
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 1rem;
`;

export default ButtonLayout;
