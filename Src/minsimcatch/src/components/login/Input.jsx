import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {string} type
 * @param {string} value
 * @param { string } className
 * @param { func } onChange
 * @param { func } onKeyDown
 * @param { string } placeholder
 * @param {string} id
 * @param {boolean} valid
 */
const Input = ({
  type,
  value,
  className,
  onChange,
  onKeyDown,
  placeholder,
  id,
  valid,
}) => {
  return (
    <StyledInput
      id={id}
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      valid={valid}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  valid: PropTypes.bool,
};

export default Input;

const StyledInput = styled.input`
  width: 240px;
  padding: 15px;
  font-size: 13px;
  border: none;
  border-bottom: 2px solid #FD9F28;
  position: relative;
`;
