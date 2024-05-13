import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 310px;
  min-width: 210px;
  height: 100%;
  background-color: #ffffff;

  padding: ${(props) => (props.className == "modal" ? "0 30px" : "0 40px")};

  display: flex;
  flex-direction: column;
`;

export const ModalMainContainer = styled(MainContainer)`
  max-height: 550px;
  min-height: 400px;
  overflow: scroll;
`;
export const JoinContainer = styled(MainContainer)`
  margin-top: 80px;
`;

export const HomeContainer = styled.div`
  padding-bottom: 7rem;
`;
export const MyVoteContainer = styled.div`
  border-top: 2px solid #f3f2f3;
  padding-bottom: 6rem;
  padding-top: 1rem;
`;

export const MyContainer = styled.div`
  width: 100%;
  min-width: 210px;
  max-width: 400px;
  height: 100%;
  overflow: scroll;

  margin-top: 63px;

  display: flex;
  flex-direction: column;
  ul,
  li {
    list-style-type: none;
  }

  border-top: 3px solid rgba(243, 242, 243, 0.46);
`;
