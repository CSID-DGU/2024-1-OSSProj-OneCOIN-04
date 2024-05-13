import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {node} children
 * @param {string} color background color
 * @param { func } onClick 버튼 클릭 이벤트
 * @param { boolean } disabled 버튼 활성화 여부
 * @param { string } className
 */

const Button = ({ children, color, onClick, disabled, className }) => {
  return (
    <StyledButton
      color={color}
      className={`button ${className}`}
      disabled={disabled}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;

const StyledButton = styled.button`
  width: 280px;
  height: 50px;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  border-radius: 50px;
  border: 1px solid transparent;
  font-size: 15px;
  background-color: ${(props) => (props.disabled ? "#ccc" : props.color)};
  padding: 0.6em 1.2em;
  font-weight: 600;
  color: #fff;
  .kakao {
    color: #333;
  }
  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#FD9F28")};
  }
`;
