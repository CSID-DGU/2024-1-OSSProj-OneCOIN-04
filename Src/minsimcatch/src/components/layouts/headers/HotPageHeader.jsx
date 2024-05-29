// 핫게 헤더
import styled from "styled-components";
import { AiOutlineFire } from "react-icons/ai";
import SearchButton from "./SearchButton";
import Icon from "@/components/common/Icon";

const HotPageHeader = () => {
  return (
    <Nav>
      <PageName>
        <Icon size="28px">
          <AiOutlineFire />
        </Icon>
        <Title>HOT 게시판</Title>
      </PageName>
      <SearchButton />
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
  margin-top: 12px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
`;

export default HotPageHeader;
