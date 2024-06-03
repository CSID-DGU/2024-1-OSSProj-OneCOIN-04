// 내가 한 투표, 내가 한 질문 헤더
import styled from "styled-components";
import BackButton from "./BackButton";
import PropTypes from "prop-types";

/**
 *
 * @param {object} prop
 * @param {string} prop.page
 */

const SubMyPageHeader = ({ page }) => {
  page = page || "내가 한 질문";
  return (
    <Nav>
      <BackButton />
      <PageName>
        <Title>{page}</Title>
      </PageName>
    </Nav>
  );
};

SubMyPageHeader.propTypes = {
  page: PropTypes.string.isRequired,
};

const Nav = styled.nav`
  height: 55px;
  position: fixed;
  top: 0px;
  width: 390px;
  background-color: #fff;
  color: #535763;
  display: flex;
  align-items: center;
  z-index: 500;
`;

const Title = styled.div`
  margin: 2px 0 0 5px;
`;
const PageName = styled.div`
  width: 100%;
  margin: auto 0 auto 5.5rem;
  font-size: 18px;
  font-weight: bold;
  display: flex;
`;

export default SubMyPageHeader;
