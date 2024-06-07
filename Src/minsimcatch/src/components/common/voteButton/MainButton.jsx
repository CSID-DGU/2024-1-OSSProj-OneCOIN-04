import React, { useState } from 'react';
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
  disableVote,  // disableVote 플래그 추가
  isOwner,
  onUpdate
}) => {
  const { isLoginIn, uid } = useLogin();
  const [alert, setIsAlert] = useState(false);
  const db = getDatabase();

  const updateVote = (optionId) => {
    if (disableVote) {
      console.log('Voting is disabled.');
      return;
    }

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
        if (id === undefined) return;

        const optionRef = ref(db, `surveys/${voteId}/options/${id}`);
        runTransaction(optionRef, (currentData) => {
          if (currentData) {
            const newVotes = (currentData.votes || 0) + increment;
            currentData.votes = newVotes < 0 ? 0 : newVotes;
            return currentData;
          }
          return currentData;
        }).then(() => {
          updatePercentages(voteId);
        });
      };
  
      adjustVotes(optionId, 1);
      if (previousOptionId) {
        adjustVotes(previousOptionId, -1);
      }
  
      set(userVoteRef, optionId).then(() => {
        if (onUpdate) onUpdate();
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
      Swal.fire('이 페이지에서 투표는 비활성화되어 있습니다.');
      return;
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

    updateVote(id);
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
      <ButtonContainer
        id={voteId}
        onClick={clickButton}
        disabled={disableVote} // 비활성화 플래그 추가
      >
        {src && <Img src={src} server={true} />}
        <MainButtonSt border={value === 100} choice={choiced} disabled={disableVote}>
          <BtnContents choice={participate && choiced}>{name}</BtnContents>
          <progress max="100" value={value} disabled={disableVote}></progress>
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
  disableVote: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func
};

const ButtonContainer = styled.div`
  div,
  p {
    background-color: transparent;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')}; // 비활성화 시 커서 변경
`;

export default MainButton;
