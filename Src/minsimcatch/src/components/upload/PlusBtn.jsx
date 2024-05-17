import Icon from "../common/Icon";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { Palette } from "@/styles/Palette";
import PropTypes from "prop-types";

/**
 *
 * @param {object} param
 * @param {function} param.onClick
 */

const PlusBtn = ({ onClick }) => {
  return (
    <PlusBtnStyle>
      <Icon
        size="30px"
        color={Palette["point_blue"]}
        onClick={onClick}
        hoverColor={Palette["font_blue"]}
      >
        <AiFillPlusCircle />
      </Icon>
      <p>선택지 추가 (최대 6개)</p>
    </PlusBtnStyle>
  );
};

PlusBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const PlusBtnStyle = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  p {
    font-size: 14px;
    color: #575757;
    margin: 0 0 0.6rem 0.3rem;
  }
`;

export default PlusBtn;
