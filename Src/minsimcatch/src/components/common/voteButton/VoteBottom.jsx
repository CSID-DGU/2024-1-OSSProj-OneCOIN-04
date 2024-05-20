import Icon from "../Icon";
import styled from "styled-components";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { FaShare } from "react-icons/fa";
import PropTypes from "prop-types";
import { commentCountInquire } from "@/services/main";
import { useQuery } from "@tanstack/react-query";

/**
 * @param {object} props
 * @param {func} props.onClick - 댓글 모달
 * @param {func} props.onClickShare - 공유 버튼 모달
 * @param {boolean} props.modal - 공유 버튼 모달
 * @param {string} props.id - 투표 id
 */

const VoteBottom = ({ onClick, onClickShare, modal, id }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => commentCountInquire(id),
    enabled: !!id,
  });

  // 데이터 로딩 상태 확인 및 에러 핸들링
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading comments</div>;
  }

  return (
    <VoteButtonStyle>
      <div className="chat" onClick={() => onClick(id)}>
        <Icon reverse={true} color="#676767" size="20px">
          <HiOutlineChatBubbleOvalLeft />
        </Icon>
        <p>댓글({data?.count || 0})</p> {/* 수정된 부분 */}
      </div>
      <Icon color="#676767" size="20px" onClick={onClickShare} modal={modal}>
        <FaShare />
      </Icon>
    </VoteButtonStyle>
  );
};

VoteBottom.propTypes = {
  onClickShare: PropTypes.func,
  onClick: PropTypes.func,
  modal: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

const VoteButtonStyle = styled.div`
  margin-top: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .chat {
    display: flex;
    align-items: center;
  }
  p {
    margin-left: 0.3rem;
    font-size: 11.5px;
  }
`;

export default VoteBottom;
