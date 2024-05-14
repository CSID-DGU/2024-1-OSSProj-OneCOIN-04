import ActiveSign from "./ActiveSign";
import { GoChevronRight } from "react-icons/go";
import styled from "styled-components";
import { Palette } from "@/styles/Palette";
import PropTypes from "prop-types";
import Modal from "../modal/Modal";
import ModalLayout from "../modal/ModalLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * @param {object} prop
 * @param {object} prop.data
 * @param {string} prop.route
 * @returns {JSX.Element}
 */
const MyVoteList = ({ data, route,titleKey }) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  console.log("타이틀 key:" , titleKey);

  const clickModal = () => {
    navigate(route + titleKey);
    setModalVisible(true);
  };

  const closeModal = () => {
    navigate(route);
    setModalVisible(false);
  };

  return (
    <div>
      <MyVote onClick={clickModal}>
        <VoteInfo>
          <ActiveSign active={data.active} />
          {data.title.length >= 15 ? (
            <div className="title">{data.title.slice(0, 15)}...</div>
          ) : (
            <div className="title">{data.title}</div>
          )}
        </VoteInfo>
        <Vote>
          더보기
          <GoChevronRight className="modal" />
        </Vote>
      </MyVote>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          <ModalLayout id={titleKey} />
        </Modal>
      )}
    </div>
  );
};

MyVoteList.propTypes = {
  data: PropTypes.object.isRequired,
  route: PropTypes.string,
};
const MyVote = styled.div`
  height: 4rem;
  display: flex;
  /* border-top: 1px solid ${Palette.percent_gray}; */
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

export default MyVoteList;
