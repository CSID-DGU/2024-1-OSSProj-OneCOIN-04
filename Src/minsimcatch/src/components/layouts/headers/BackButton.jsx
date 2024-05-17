import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icon from "@/components/common/Icon";
import routes from "@/routes";
import PropTypes from "prop-types";

/**
 *
 * @param {object} props
 * @param {boolean} props.upload
 */

const BackButton = ({ upload }) => {
  const navigate = useNavigate();
  const route = upload ? -1 : routes.mypage;
  return (
    <div>
      <Back>
        <Icon size="35px" onClick={() => navigate(route)}>
          <GoChevronLeft />
        </Icon>
      </Back>
    </div>
  );
};

BackButton.propTypes = {
  upload: PropTypes.bool,
};

const Back = styled.button`
  margin-top: 3px;
  margin-left: 5px;
  color: #7192ff;
  background-color: #fff;
  border-width: 0px;
  cursor: pointer;
`;

export default BackButton;
