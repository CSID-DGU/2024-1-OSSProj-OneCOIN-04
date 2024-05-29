// 사용자 마이페이지 헤더
import styled from "styled-components";
import { BsPerson } from "react-icons/bs";

const MyPageHeader = () => {
  return (
    <Nav>
      <PageName>
        <BsPerson fontSize={28} />
        <Title>마이 페이지</Title>
      </PageName>
    </Nav>
  );
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
  margin: auto;
  font-size: 18px;
  font-weight: bold;
  display: flex;
`;

export default MyPageHeader;
