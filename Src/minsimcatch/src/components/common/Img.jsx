import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {string} props.src 이미지 주소
 * @param {string} props.size 이미지 크기
 */
const Img = ({ src, size }) => {
  return (
    <ImgContainer size={size}>
      <ImgStyle src={src} size={size} />
    </ImgContainer>
  );
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.string,
};

const ImgStyle = styled.img`
  width: ${(props) => props.size || "111px"};
  height: ${(props) => props.size || "111px"};
  object-fit: cover;
`;

const ImgContainer = styled.div`
  width: ${(props) => props.size || "111px"};
  height: ${(props) => props.size || "111px"};
  overflow: hidden;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Img;
