import PropTypes from "prop-types";
import Img from "@/components/common/Img";
import styled from "styled-components";

/**
 *
 * @param {object} props
 * @param {object} props.data
 * @param {function} props.onClick
 * @param {boolean} props.isOwner
 */
const Chat = ({ data, onClick, isOwner }) => {
  const createTime = new Date(data.createTime);
  const year = createTime.getFullYear();
  const month = String(createTime.getMonth() + 1).padStart(2, "0");
  const day = String(createTime.getDate()).padStart(2, "0");
  const hours = String(createTime.getHours()).padStart(2, "0");
  const minutes = String(createTime.getMinutes()).padStart(2, "0");

  const formatDate = `${year}.${month}.${day} ${hours}:${minutes}`;
  return (
    <>
      <ChatStyled>
        <Img src="./image/vv.png" size="35px" />
        <div>
          <UserStyled>
            <NameStyled>{data.username}</NameStyled>
            <DateStyled>{formatDate}</DateStyled>
            {isOwner && (
              <DeleteStyled onClick={() => onClick(data.id)}>삭제</DeleteStyled>
            )}
          </UserStyled>
          <ContentStyled>{data.content}</ContentStyled>
        </div>
      </ChatStyled>
    </>
  );
};

Chat.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  isOwner: PropTypes.bool.isRequired,
};

const ChatStyled = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 10px;
`;
const UserStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 0 13px;
  gap: 6px;
`;
const NameStyled = styled.div`
  position: relative;
  left: 0;
  top: 10px;
  font-family: "Nanum Gothic";
  font-weight: 400;
  font-size: 14px;
  line-height: 12px;
  color: #828282;
`;
const DateStyled = styled.div`
  position: relative;
  left: 0;
  top: 10px;
  font-family: "Nanum Gothic";
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
`;
const DeleteStyled = styled.div`
  position: relative;
  left: 55px;
  top: 10px;
  font-family: "Nanum Gothic";
  font-weight: 400;
  font-size: 10px;
  color: #e45151;
  cursor: pointer;
`;
const ContentStyled = styled.div`
  position: relative;
  left: 0;
  top: 0%;
  font-family: "Nanum Gothic";
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #191c1f;
`;
export default Chat;
