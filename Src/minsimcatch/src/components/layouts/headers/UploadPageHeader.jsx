// 투표 등록 페이지 헤더
import styled from "styled-components";
import BackButton from "./BackButton";

const UploadPageHeader = () => {
  return (
    <Nav>
      <BackButton upload={true} />
      <PageName>
        <Title>투표 등록하기</Title>
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
  width: 100%;
  margin: auto 120px auto 73px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
`;

export default UploadPageHeader;
