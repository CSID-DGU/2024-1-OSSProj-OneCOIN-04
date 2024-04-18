import styled from "styled-components";
import { Palette } from "./Palette";

export const MainButtonSt = styled.div`
  cursor: pointer;
  font-family: "NanumGothic";
  max-width: 300px;
  min-width: 110px;
  margin-top: -1rem;

  ::-webkit-progress-bar {
    border-radius: 20px;

    height: 38px;
    width: 100%;

    background-color: #ffffff;
    box-shadow: 0px 1.68314px 1.68314px 1.26236px rgba(0, 0, 0, 0.25);
  }
  progress {
    appearance: none;
    width: 100%;
  }
  ::-webkit-progress-value {
    background-color: ${(props) =>
      props.choice ? Palette["percent_blue"] : Palette["percent_gray"]};

    transition: all 0.3s;

    border-top-right-radius: ${(props) => (props.border ? "20000px" : null)};
    border-bottom-right-radius: ${(props) => (props.border ? "20000px" : null)};
    border-top-left-radius: 20000px;
    border-bottom-left-radius: 20000px;
  }
`;
export const BtnContents = styled.p`
  margin: 0 1.5rem;
  color: ${(props) =>
    props.choice ? Palette["font_blue"] : Palette["font_gray"]};

  position: relative;
  top: 2.1rem;
  /* top: 2.7rem; */
  z-index: 2;

  font-size: 12px;
  font-weight: 600;
`;

export const PercentNnumberSt = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.7rem;
  height: 0.7rem;
  color: ${(props) =>
    props.choice ? Palette["font_blue"] : Palette["font_gray"]};
  p {
    font-size: 12px;
    font-weight: 600;
  }
  p:first-child::after {
    content: "|";
    color: ${Palette["percent_gray"]};
    font-weight: 800;
    margin: 0 0.3rem;
  }
`;
