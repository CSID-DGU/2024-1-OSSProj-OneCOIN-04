import PropTypes from "prop-types";

/**
 * @param {object} prop
 * @param {node} prop.children
 * @param {string} prop.className
 */
const Box = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

Box.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Box;
