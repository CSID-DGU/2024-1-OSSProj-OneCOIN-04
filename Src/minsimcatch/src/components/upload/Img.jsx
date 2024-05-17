import styled from "styled-components";
import { useRecoilState } from "recoil";
import { optionState } from "@/utils/UploadAtom";
import { useEffect, useState } from "react";
import Icon from "../common/Icon";
import { GoFileMedia } from "react-icons/go";
import { useRef } from "react";
import PropTypes from "prop-types";
import Resizer from "react-image-file-resizer";
/**
 *
 * @param {object} param
 * @param {number} param.id
 * @param {string} param.src
 */

const Img = ({ id, src }) => {
  const [imgFile, setImgFile] = useState("");
  const [option, setOption] = useRecoilState(optionState);
  const [img, setImg] = useState(false);
  const imgRef = useRef();

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const saveImgFile = async (e) => {
    const file = await imgRef.current.files[0];
    const supportedFormats = ["image/jpeg", "image/png"];
    if (!supportedFormats.includes(file.type)) {
      alert(
        "지원되지 않는 이미지 형식입니다. JPEG, PNG 형식의 이미지를 업로드해주세요."
      );
      return;
    }
    try {
      const compressedFile = await resizeFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        reader.result;
        setImgFile(reader.result);
        inputImg(reader.result);
      };
    } catch (error) {
      console.error("이미지 리사이징 및 압축 중 오류가 발생했습니다:", error);
    }
  };

  const inputImg = (src) => {
    setOption((prop) => {
      return prop.map((choice, index) => {
        if (id == index) {
          return { ...choice, image: src };
        } else {
          return choice;
        }
      });
    });
  };
  useEffect(() => {
    option.map((choice, index) => {
      if (choice.image && index == id) {
        return setImg(true);
      }
    });
  }, []);

  return (
    <>
      {(imgFile && src) || img ? (
        <ImgContainer>
          {" "}
          <div className="Div">
            <img className="Img" src={src} id={id}></img>
          </div>
        </ImgContainer>
      ) : (
        <Container>
          <FileUploadContainer>
            <label htmlFor={`file${id}`} className="fileLabel" id={id}>
              <Icon size="23px" color="#7d7d7d">
                <GoFileMedia />
              </Icon>
              <p>이미지 추가</p>
            </label>
            <input
              type="file"
              className="fileInput"
              id={`file${id}`}
              accept=".jpg, .png"
              onChange={(e) => {
                saveImgFile(e);
              }}
              ref={imgRef}
            />
          </FileUploadContainer>
        </Container>
      )}
    </>
  );
};

Img.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
};

const Container = styled.form`
  width: 134px;
  height: 48px;
  text-align: center;

  background-color: #d8d8d8;
  margin: 1rem 0;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #cacaca;
  }
`;
const ImgContainer = styled.div`
  width: 111px;
  .Img {
    width: 111px;
  }
  .Div {
    width: 111px;
    height: 111px;
    overflow: hidden;
    margin-top: 0.8rem;
    margin-bottom: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const FileUploadContainer = styled.div`
  margin: 0;
  .fileInput {
    display: none;
  }
  .fileLabel {
    font-size: 14px;
    color: #7d7d7d;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7px 5px 0 0;
  }
  .fileLabel p {
    margin: 0 0 7px 5px;
  }
`;

export default Img;
