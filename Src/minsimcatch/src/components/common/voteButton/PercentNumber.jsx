import { PercentNnumberSt } from "@/styles/VotingBtnStyle";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {boolean} props.choiced
 * @param {number} props.value 버튼 안에 퍼센트
 * @param {number} props.number 투표 참여자 수
 */
const PercentNumber = ({ value, number, choice }) => {
  return (
    <PercentNnumberSt choice={choice}>
      <p>{value}%</p>
      <p>{number}명</p>
    </PercentNnumberSt>
  );
};

PercentNumber.propTypes = {
  value: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  choice: PropTypes.bool.isRequired,
};
export default PercentNumber;
