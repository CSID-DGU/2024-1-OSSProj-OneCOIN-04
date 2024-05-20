import MainButton from "./MainButton";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonLayout = ({
  options,
  participate,
  isOwner,
  changeVotes,
  voteId,
  isLogIn
}) => {
  return (
    <Container>
      {options.map(option => (
        <MainButton
          key={option.id}
          id={option.id}
          name={option.name}
          value={option.percentage}
          number={option.votes} // 각 옵션의 votes 값을 전달
          participate={participate}
          isOwner={isOwner}
          voteId={voteId}
          changeVotes={changeVotes}
          isLogIn={isLogIn}
        />
      ))}
    </Container>
  );
};

ButtonLayout.propTypes = {
  options: PropTypes.array.isRequired,
  participate: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  changeVotes: PropTypes.func.isRequired,
  voteId: PropTypes.string.isRequired,
  isLogIn: PropTypes.bool.isRequired,
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
