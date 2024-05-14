import styled from "styled-components";
import MypageMainLi from "./MypageMainLi";
import { useNavigate } from "react-router-dom";
import route from "@/routes";
import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "../modal/Modal";
import ProfileModal from "@/pages/my/ProfileModal";

/**
 *@param {object} prop
 * @param {number} prop.votingNumber 내가 참여한 투표
 * @param {number} prop.questionNumber 내가 한 질문
 * @param {object} prop.data 내 정보 수정
 * @return {JSX.Element}
 */

const MyPageUl = ({ votingNumber, questionNumber, data }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);

  const openProfile = () => {
    setProfile(true);
  };
  const closeProfile = () => {
    setProfile(false);
    window.location.reload();
  };
  return (
    <MyUlStyle>
      <MypageMainLi
        content="내가 참여한 투표"
        number={votingNumber}
        onClick={() => navigate(route.myparticipation)}
      ></MypageMainLi>
      <MypageMainLi
        content="내가 한 질문"
        number={questionNumber}
        onClick={() => navigate(route.myquestion)}
      ></MypageMainLi>
      <MypageMainLi content="내 정보 수정" onClick={openProfile}></MypageMainLi>
      {profile && (
        <Modal
          visible={profile}
          closable={true}
          maskClosable={true}
          onClose={closeProfile}
        >
          <ProfileModal
            myNickName={data.nickname}
            myEmail={data.email}
            img="./vv.jpg"
          />
        </Modal>
      )}
    </MyUlStyle>
  );
};

MyPageUl.propTypes = {
  votingNumber: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
};
const MyUlStyle = styled.ul`
  display: flex;
  flex-direction: column;
  color: #6b6b6b;
  margin: 0;
  padding: 0;
`;
export default MyPageUl;
