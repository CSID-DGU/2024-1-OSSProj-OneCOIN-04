import React, { useState, useCallback } from 'react';
import ActiveSign from "./ActiveSign";
import { GoChevronRight } from "react-icons/go";
import styled from "styled-components";
import { Palette } from "@/styles/Palette";
import PropTypes from "prop-types";
import Modal from "../modal/Modal";
import ModalLayout from "../modal/ModalLayout";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import routes from "@/routes";

const MyVoteList = ({ data, route, titleKey }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const database = getDatabase();

  const clickModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleDelete = useCallback(() => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 삭제합니다!',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        const surveyRef = ref(database, `surveys/${titleKey}`);
        remove(surveyRef)
          .then(() => {
            Swal.fire(
              '삭제되었습니다!',
              '선택한 항목이 삭제되었습니다.',
              'success'
            );
          })
          .catch((error) => {
            console.error("Error deleting data: ", error);
            Swal.fire(
              '삭제 실패',
              '항목을 삭제하는 데 실패했습니다.',
              'error'
            );
          });
      }
    });
  }, [database, titleKey]);

  return (
    <div>
      <MyVote>
        <VoteInfo onClick={clickModal}>
          <ActiveSign active={data.active} />
          {data.title.length >= 15 ? (
            <div className="title">{data.title.slice(0, 15)}...</div>
          ) : (
            <div className="title">{data.title}</div>
          )}
        </VoteInfo>
        <Vote>
          <span>더보기</span>
          <GoChevronRight className="modal" />
          {user?.uid === data.userId && (
            <DeleteButton onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}>삭제</DeleteButton>
          )}
        </Vote>
      </MyVote>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          <ModalLayout
            id={titleKey}
            disableVote={route === routes.myparticipation} // 특정 경로에서는 투표 비활성화
          />
        </Modal>
      )}
    </div>
  );
};

MyVoteList.propTypes = {
  data: PropTypes.object.isRequired,
  route: PropTypes.string,
  titleKey: PropTypes.string.isRequired
};

const MyVote = styled.div`
  height: 4rem;
  display: flex;
  border-bottom: 1px solid ${Palette.percent_gray};
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: ${Palette.percent_gray};
  }
`;

const VoteInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 20px;
  font-size: 17px;
  > .title {
    width: 270px;
    height: 26px;
    text-align: left;
  }
`;

const Vote = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 12px;
  & > .modal {
    font-size: 20px;
    color: ${Palette.point_blue};
  }
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  background-color: ${Palette.button_red};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 2px 6px;
  cursor: pointer;
  &:hover {
    background-color: ${Palette.button_red_dark};
  }
`;

export default MyVoteList;
