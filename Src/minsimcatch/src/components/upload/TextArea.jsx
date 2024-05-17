import { InputStyle } from "./input";
import styled from "styled-components";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { contentState } from "@/utils/UploadAtom";
import PropTypes from "prop-types";

/**
 * @param {object} param
 * @param {string} param.name
 */
const TextArea = ({ name }) => {
  const [upload, setUpload] = useRecoilState(contentState);
  const textArea = useRef();

  const textAreaHeight = () => {
    textArea.current.style.height = 0;
    textArea.current.style.height = textArea.current.scrollHeight + "px";
  };
  return (
    <TextAreaStyle>
      <label htmlFor="content">{name}</label>
      <textarea
        id="content"
        placeholder="상세설명을 입력해주세요"
        ref={textArea}
        onChange={(e) => {
          textAreaHeight(e);
          setUpload(e.target.value);
        }}
        rows={1}
        value={upload}
      ></textarea>
    </TextAreaStyle>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
};

const TextAreaStyle = styled(InputStyle)`
  margin-top: 2rem;
  textarea {
    padding: 20px 20px 0px 20px;
    width: 266px;
    height: 45px;
    font-size: 14px;

    line-height: 150%;

    border: 1px solid #4f4f4f;
    border-radius: 6px;

    box-shadow: 0px 2px 2px rgba(126, 126, 126, 0.25);
    resize: none;
  }
`;

export default TextArea;