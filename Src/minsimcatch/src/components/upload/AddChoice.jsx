import React from 'react';
import { useRecoilState } from 'recoil';
import { optionState } from '@/utils/UploadAtom';
import styled from 'styled-components';
import { database } from '@/firebase-config';
import { ref, push, remove, update } from 'firebase/database';
import ChoiceOption from "./ChoiceOption";
import PlusBtn from "./PlusBtn";
import { v4 as uuidv4 } from 'uuid'; // UUID 라이브러리 추가

const AddChoice = () => {
  const [option, setOption] = useRecoilState(optionState);

  const AddOption = () => {
    if (option.length < 6) {
      const newOption = { name: "", image: null, id: uuidv4() }; // 즉시 ID 생성
      push(ref(database, 'options'), newOption) // 비동기로 Firebase에 추가
        .then(() => {
          setOption([...option, newOption]); // 상태 업데이트
        });
    }
  };

  const deleteOption = (optionId) => {
    remove(ref(database, `options/${optionId}`));
    setOption(option.filter(opt => opt.id !== optionId));
  };

  const inputOption = (optionId, newName) => {
    if (newName.length > 15) {
      alert("옵션 내용은 15자 이내로 입력해주세요😥");
      return;
    }
    update(ref(database, `options/${optionId}`), { name: newName });
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
            src={choice.image}
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