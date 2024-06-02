import React from 'react';
import { useRecoilState } from 'recoil';
import { optionState } from '@/utils/UploadAtom';
import styled from 'styled-components';
import ChoiceOption from "./ChoiceOption";
import PlusBtn from "./PlusBtn";

const AddChoice = () => {
  const [option, setOption] = useRecoilState(optionState);

  const AddOption = () => {
    if (option.length < 6) {
      const newOption = { name: "", id: option.length + 1 }; // id 값 수정
      setOption([...option, newOption]); // 상태 업데이트
    }
  };

  const deleteOption = (optionId) => {
    setOption(option.filter(opt => opt.id !== optionId));
  };

  const inputOption = (optionId, newName) => {
    if (newName.length > 15) {
      alert("옵션 내용은 15자 이내로 입력해주세요😥");
      return;
    }
    setOption(option.map(opt => opt.id === optionId ? { ...opt, name: newName } : opt));
  };

  return (
    <Container hasValue={option.length}>
      <div className="labelBtn">
        <label>선택지 추가 (최소 2개이상) *</label>
      </div>
      <OptionContainer>
        {option.map((choice) => (
          <ChoiceOption
            key={choice.id}
            id={choice.id}
            data={choice}
            inputOption={inputOption}
            deleteOption={deleteOption}
          />
        ))}
      </OptionContainer>
      <PlusBtn onClick={AddOption}></PlusBtn>
    </Container>
  );
};

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  right: ${(prop) => (prop.hasValue ? "0" : "5.1rem")};
  .labelBtn {
    margin: 0 0 5px 0;
    display: flex;
    justify-content: space-between;
  }
  .labelBtn > label {
    font-size: 14px;
    color: #999999;
    margin: 0 0 5px 13px;
  }
  .reset {
    position: relative;
    left: 180px;
    background-color: #d6deed;
    border: none;
    border-radius: 1rem;
    font-size: 12px;
    color: #797979;
  }
  .reset:hover {
    background-color: #c8d1e1;
  }
`;

export default AddChoice;
