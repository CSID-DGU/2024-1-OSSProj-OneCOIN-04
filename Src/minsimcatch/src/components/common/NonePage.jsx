import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import routes from "@/routes";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {string} props.what
 * @param {string} props.query
 */

const NonePage = ({ what, query }) => {
  const navigate = useNavigate();
  return (
    <>
      {what === "main" && (
        <NoneStyle>
          게시글이 없습니다. <br></br>첫 질문을 작성해 보세요!
          <button onClick={() => navigate(routes.upload)}>질문하러 가기</button>
        </NoneStyle>
      )}
      {what === "complete" && (
        <NoneStyle>
          완료된 게시글이 없습니다.
          {/* <br></br>첫 질문을 작성해 보세요!
          <button onClick={() => navigate(routes.upload)}>질문하러 가기</button> */}
        </NoneStyle>
      )}
      {what === "research" && (
        <NoneStyle>
          &apos;{query}&apos; 와 관련된 게시글이 없습니다. <br></br>첫 질문을
          작성해 보세요!
          <button onClick={() => navigate(routes.upload)}>질문하러 가기</button>
        </NoneStyle>
      )}
      {what === "hot" && (
        <NoneStyle>
          핫게시글이 없습니다. <br></br>투표를 해서 핫게시글을 만들어주세요!
          <button onClick={() => navigate(routes.home)}>투표하러 가기</button>
        </NoneStyle>
      )}
    </>
  );
};

NonePage.propTypes = {
  what: PropTypes.string.isRequired,
  query: PropTypes.string,
};

const NoneStyle = styled.div`
  margin-top: 10rem;
  font-size: 17px;
  line-height: 220%;
  color: #707070;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & button {
    width: 200px;
    height: 53px;

    color: #ffffff;
    background: #7192ff;
    box-shadow: 2.67454px 5.34909px 8.02363px rgba(78, 99, 141, 0.06),
      inset 0px 2.67454px 8.02363px rgba(200, 211, 249, 0.6);

    border-radius: 54px;
    border: 0;
    margin-top: 2rem;

    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 0.1em;
  }
  & button:hover {
    background: #607cda;
  }
`;

export default NonePage;
