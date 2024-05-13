import Box from "./Box";
import Label from "./Label";
import Input from "./Input";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {string} id
 * @param {string} type
 * @param { func } onChange
 * @param { func } onKeyDown
 * @param { string } value
 * @param { string } className
 * @param {string} placeholder
 * @param {string} label
 * @param {boolean} valid
 */
const InputGroup = ({
  id,
  type,
  value,
  onChange,
  onKeyDown,
  className,
  placeholder,
  label,
  valid,
}) => {
  return (
    <Box className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        valid={valid}
      />
    </Box>
  );
};

InputGroup.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  valid: PropTypes.bool,
};

export default InputGroup;
