import React from 'react';
import styled from 'styled-components';
import { GoX } from 'react-icons/go';
import PropTypes from 'prop-types';

const ChoiceOption = ({ id, data, inputOption, deleteOption }) => {
  return (
    <div>
      <Container>
        <div className="xbutton" onClick={() => deleteOption(id)}>
          <GoX className="xIcon" />
        </div>
        <input
          value={data?.name}
          onChange={(e) => inputOption(id, e.target.value)}
          placeholder={`선택지 ${id + 1}`}
          className="nameInput"
          id={`nameInput-${id}`}
        />
      </Container>
    </div>
  );
};

ChoiceOption.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  inputOption: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
};

const Container = styled.div`
  background-color: #ececec;
  width: 162px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .xbutton {
    position: relative;
    left: 65px;
    top: 5px;
    cursor: pointer;
  }
  .xIcon:hover {
    background-color: #d2d2d2;
    border-radius: 10px;
  }
  .nameInput {
    border: 1px solid #4f4f4f;
    border-radius: 6px;
    height: 33px;
    width: 108px;
    padding-left: 10px;
    box-shadow: 0px 2px 2px rgba(126, 126, 126, 0.25);
  }
`;

export default ChoiceOption;
