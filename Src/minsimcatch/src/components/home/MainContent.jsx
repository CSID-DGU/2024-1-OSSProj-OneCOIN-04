import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 *
 * @param {object} prop
 * @param {string} prop.title
 * @param {string} prop.content
 */

const MainContent = ({ title, content }) => {
  const [moreState, setMoreState] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const showMoreBtnClick = () => {
    setMoreState(!moreState);
    setButtonState(!buttonState);
  };
  return (
    <MainContentStyle>
      <h1>Q. {title}</h1>
      <div>
        <span className={moreState ? "more" : "short"}>
          <p>{content}</p>{" "}
          {content?.length > 50 ? (
            <button onClick={showMoreBtnClick}>
              {buttonState ? "줄이기" : "자세히 보기"}
            </button>
          ) : (
            <></>
          )}
        </span>
      </div>
    </MainContentStyle>
  );
};

MainContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const MainContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: start;
  margin: 0 1rem 0rem 1rem;
  width: 90%;
  line-height: 1.5rem;
  & h1 {
    font-size: 23px;
    font-weight: 900;
    color: #000000;
    margin-bottom: 20px;
    line-height: 150%;
  }

  .more p {
    font-size: 13px;
    max-width: 270px;
  }
  .short p {
    font-size: 13px;
    max-width: 270px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
  }
  & div {
    display: flex;
  }

  & button {
    border: 0;
    color: #9e9e9e;
    background-color: #ffffff;
    margin: 0;
    position: relative;
    bottom: 8px;
  }
`;

export default MainContent;
