import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {object} props.error
 * */

const ErrorScreen = ({ error }) => {
  return (
    <ErrorStyle>
      <p>
        {error?.data?.status} {error?.data?.error}
      </p>
      <p> {error?.data?.message || "네트워크 오류"} 🥲</p>
    </ErrorStyle>
  );
};

ErrorScreen.propTypes = {
  error: PropTypes.object,
};

const ErrorStyle = styled.div`
  margin-top: 15rem;
  & p:first-child {
    font-size: 30px;
    color: #de0000;
  }
  & p:last-child {
    font-size: 20px;
  }
`;

export default ErrorScreen;
