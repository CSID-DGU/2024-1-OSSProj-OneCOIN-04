import styled from "styled-components";
import { useEffect } from "react";
import { fadeIn } from "@/styles/animation/FadeIn";
import PropTypes from "prop-types";
/**
 *
 * @param {object} param
 * @param {string} param.children 알람 내용
 * @param {func} param.setIsAlert  setIsAlert(false) 3초간 실행
 * @param {string} param.positionLeft 토스트창 위치 수정(positionLeft)
 */

const Alert = ({ children, setIsAlert, positionLeft }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlert(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [setIsAlert]);
  return <Container left={positionLeft}>{children}</Container>;
};
Alert.propTypes = {
  children: PropTypes.string.isRequired,
  setIsAlert: PropTypes.func.isRequired,
  positionLeft: PropTypes.string,
};

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.696);
  color: white;
  width: 20rem;
  height: 2.5rem;
  font-size: 13px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px 0 rgba(46, 46, 46, 0.5);
  left: ${(prop) => prop.left};
  position: fixed;
  top: 10%;
  animation: ${fadeIn} 1s ease-in-out 0s infinite normal none running;
  z-index: 1000000000;
`;

export default Alert;
