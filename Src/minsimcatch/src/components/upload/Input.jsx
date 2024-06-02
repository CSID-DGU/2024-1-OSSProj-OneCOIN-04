import styled from "styled-components";
import { useRecoilState } from "recoil";
import { titleState } from "@/utils/UploadAtom";
import PropTypes from "prop-types";

/**
 * @param {object} param
 * @param {string} param.name
 * @param {string} param.placeholder
 */
const Input = ({ name, placeholder }) => {
  const [upload, setUpload] = useRecoilState(titleState);

  return (
    <InputStyle>
      <label htmlFor="title">{name}</label>
      <input
        id="title"
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          setUpload(e.target.value);
        }}
        value={upload}
        autoFocus
      />
    </InputStyle>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 300;
  align-items: flex-start;
  color: #999999;

  input {
    width: 286px;
    height: 43px;
    font-size: 14px;
    padding-left: 20px;

    border-radius: 6px;
    border: 1px solid #4f4f4f;

    box-shadow: 0px 2px 2px rgba(126, 126, 126, 0.25);
  }

  label {
    margin-bottom: 5px;
  }
`;

export default Input;
