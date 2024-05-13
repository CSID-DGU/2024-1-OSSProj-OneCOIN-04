import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {node} children
 * @param {string} htmlFor
 */
const Label = ({ children, htmlFor }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
};
export default Label;

const StyledLabel = styled.label`
  display: block;
  margin: 10px 0;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  color: #333;
`;
