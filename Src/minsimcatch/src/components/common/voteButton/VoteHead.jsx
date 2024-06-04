import styled from "styled-components";
import { BsPeopleFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { Palette } from "@/styles/Palette";
import EndButton from "@/components/common/voteButton/EndButton";
import { useEffect, useState } from "react";
import { contentList } from "@/components/layouts/headers/DropdownList";
import Icon from "../Icon";

/**
 * @param {object} props
 * @param {number} props.totalCount 투표자 수
 * @param {string} props.what hot,complete,main
 * @param {string} props.username 작성자 이름
 * @param {boolean} props.isOwner 작성자 확인
 * @param {string} props.active 투표 진행중 여부 : continue, complete
 * @param {string} props.categoryValue 카테고리 값
 * @param {string} props.id 게시물 ID
 * @param {boolean} props.modal 모달 표시 여부
 */
const VoteHead = ({
  totalCount,
  what,
  username,
  isOwner,
  active,
  categoryValue,
  id,
  modal,
}) => {
  const [categoryName, setCategoryName] = useState(null);
  useEffect(() => {
    contentList.forEach((prop) => {
      if (prop.value === categoryValue) {
        setCategoryName(prop.category);
      }
    });
  }, [categoryValue]);

  return (
    <>
      <HeadCategory>카테고리 | {categoryName}</HeadCategory>
      <VoteHeadLayout>
        <VoteHeadCss>
          {what === "hot" ? (
            <img src={`/image/fire.png`} alt="Hot Icon" />
          ) : (
            <Icon>
              <BsPeopleFill />
            </Icon>
          )}
          {active === "complete" ? (
            <div>
              <div className="completeTitle">
                <div className="complete">
                  <p>투표자수</p>
                  <p>{totalCount}</p>
                  <p>{username}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="voteTitle">
              <div className="voteNumber">{totalCount}명이 투표중입니다.</div>
            </div>
          )}
        </VoteHeadCss>
        <EndButton isOwner={isOwner} active={active} id={id} modal={modal} />
      </VoteHeadLayout>
    </>
  );
};

VoteHead.propTypes = {
  totalCount: PropTypes.number.isRequired,
  what: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  active: PropTypes.string.isRequired,
  categoryValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  modal: PropTypes.bool,
};

const VoteHeadLayout = styled.div`
  display: flex;
`;

const HeadCategory = styled.div`
  width: 100%;
  color: ${Palette.point_blue};
  font-size: 13px;
  display: flex;
  justify-content: start;
  margin-bottom: 0.3rem;
`;

const VoteHeadCss = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  align-items: flex-start;
  position: relative;

  .voteTitle {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
  }
  .voteNumber {
    font-size: 15.57px;
    font-weight: 700;
  }

  .completeTitle {
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
    position: relative;
    bottom: 1rem;
  }
  .completeTitle p:first-child {
    font-size: 10px;
    margin-right: 0.3rem;
  }
  .completeTitle p:nth-child(2) {
    font-size: 20px;
    font-weight: 900;
  }
  .completeTitle p:nth-child(3) {
    font-size: 13px;
    margin-left: 0.3rem;
    color: ${Palette.font_gray};
  }
  .completeTitle p:nth-child(3)::before {
    content: "|";
    color: ${Palette.percent_gray};
    margin-right: 5px;
  }

  .complete {
    display: flex;
    align-items: center;
  }
`;

export default VoteHead;
