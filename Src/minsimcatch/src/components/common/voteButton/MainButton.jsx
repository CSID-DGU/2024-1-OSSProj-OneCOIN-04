import React, { useState, useEffect } from 'react';
import { getDatabase, ref, runTransaction, set, get } from 'firebase/database';
import useLogin from '@/hooks/useLogin';
import Swal from 'sweetalert2';
import { MainButtonSt, BtnContents } from '@/styles/VotingBtnStyle';
import PercentNumber from './PercentNumber';
import styled from 'styled-components';
import Img from '../Img';
import PropTypes from 'prop-types';
import Alert from '../Alert';

const MainButton = ({
  choiced,
  value,
  number,
  name,
  id,
  src,
  participate,
  active,
  voteId,
  disableVote,
  isOwner,
  onUpdate // 추가된 속성
}) => {
  const { isLoginIn, uid } = useLogin();
  const [alert, setIsAlert] = useState(false);
  const db = getDatabase();

  const updateVote = (optionId) => {
    if (!uid) {
      console.log('User not logged in.');
      setIsAlert(true);
      Swal.fire('로그인이 필요합니다.');
      return;
    }

    const userVoteRef = ref(db, `user_votes/${uid}/${voteId}`);
    get(userVoteRef).then((snapshot) => {
      const previousOptionId = snapshot.val();
      if (previousOptionId === optionId) {
        Swal.fire('이미 이 옵션에 투표하셨습니다.');
        return;
      }

      const adjustVotes = (id, increment) => {
        const optionRef = ref(db, `surveys/${voteId}/options/${id}`);
        runTransaction(optionRef, (currentData) => {
          if (currentData) {
            currentData.votes = (currentData.votes || 0) + increment;
            return currentData;
          }
          return currentData;
        }).then(() => {
          updatePercentages(voteId);  // After updating votes, recalculate percentages
        });
      };

      adjustVotes(optionId, 1);
      if (previousOptionId) {
        adjustVotes(previousOptionId, -1);
      }

      set(userVoteRef, optionId).then(() => {
        if (onUpdate) onUpdate();  // Update 상태 호출
      });
    });
  };

  const updatePercentages = (voteId) => {
    const surveyRef = ref(db, `surveys/${voteId}/options`);
    get(surveyRef).then((snapshot) => {
      if (snapshot.exists()) {
        const options = snapshot.val();
        const totalVotes = Object.values(options).reduce((sum, option) => sum + (option.votes || 0), 0);
        Object.keys(options).forEach((optionId) => {
          const votes = options[optionId].votes || 0;
          const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(2) : 0;
          set(ref(db, `surveys/${voteId}/options/${optionId}/percentage`), parseFloat(percentage));
        });
      }
    });
  };

  const clickButton = (e) => {
    e.preventDefault();

    if (disableVote) {
      return; // complete 페이지에서는 아무 작업도 하지 않음
    }

    if (!isLoginIn) {
      setIsAlert(true);
      Swal.fire('로그인이 필요합니다.');
      return;
    }

    if (isOwner) {
      setIsAlert(true);
      Swal.fire('본인 게시글은 투표 불가합니다.');
      return;
    }

    updateVote(id); // Handle vote updating logic
  };

  return (
    <>
      {alert && (
        <Alert setIsAlert={setIsAlert}>
          {active === 'complete'
            ? '종료된 게시글은 투표가 불가합니다.'
            : isOwner
            ? '본인 게시글은 투표 불가합니다.'
            : '로그인 후 투표가 가능합니다.'}
        </Alert>
      )}
      <ButtonContainer id={voteId} onClick={clickButton}>
        {src && <Img src={src} server={true} />}
        <MainButtonSt border={value === 100} choice={choiced}>
          <BtnContents choice={participate && choiced}>{name}</BtnContents>
          <progress max="100" value={value}></progress>
        </MainButtonSt>
        {value !== undefined && (
          <PercentNumber value={value} number={number} choice={choiced} />
        )}
      </ButtonContainer>
    </>
  );
};

MainButton.propTypes = {
  choiced: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  participate: PropTypes.bool.isRequired,
  active: PropTypes.string.isRequired,
  voteId: PropTypes.string.isRequired,
  disableVote: PropTypes.bool, // 추가된 속성
  isOwner: PropTypes.bool.isRequired, // 추가된 속성
  onUpdate: PropTypes.func // 추가된 속성
};

const ButtonContainer = styled.div`
  div,
  p {
    background-color: transparent;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MainButton;
