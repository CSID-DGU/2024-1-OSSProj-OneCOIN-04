import styled from "styled-components";
import { Palette } from "@/styles/Palette";
import PropTypes from "prop-types";

/**
 *@param {string} prop
 * @param {string} prop.active
 * @return {JSX.Element}
 */
const ActiveSign = ({ active }) => {
  return (
    <>
      {active === "continue" ? (
        <Label className="continue">진행중</Label>
      ) : (
        <Label className="closed">종료</Label>
      )}
    </>
  );
};

ActiveSign.propTypes = {
  active: PropTypes.string,
};

const Label = styled.div`
  font-size: 10px;
  width: 2.5rem;
  height: 1rem;
  border: 1px solid;
  border-radius: 80px;
  margin: 7px 0 4px 0;
  &.continue {
    color: ${Palette.point_blue};
  }
  &.closed {
    color: #fff;
    background-color: ${Palette.font_gray};
    border-color: ${Palette.font_gray};
  }
`;

export default ActiveSign;
