import TextArea from "@/components/upload/TextArea";
import Input from "@/components/upload/Input";
import styled from "styled-components";
import AddChoice from "@/components/upload/AddChoice";
import Category from "@/components/upload/Category"; // 파일 이름 변경
import UploadButton from "@/components/upload/UploadButton";
import { useEffect } from "react";
import { uploadSelector } from "@/utils/UploadAtom";
import { useResetRecoilState } from "recoil";
import { BiReset } from "react-icons/bi";
import Swal from "sweetalert2";
import Icon from "@/components/common/Icon";
import UploadPageHeader from "@/components/layouts/headers/UploadPageHeader";
import { useNavigate } from "react-router-dom";
import useLogin from "@/hooks/useLogin";

const UploadPage = () => {
  const navigate = useNavigate();
  const resetList = useResetRecoilState(uploadSelector);
  const { isLoginIn, loading } = useLogin();

  const resetClick = () => {
    Swal.fire({
      icon: "info",
      text: "전체 내용을 초기화 하겠습니까?",
      showCancelButton: true,
      confirmButtonText: "예",
      cancelButtonText: "아니오",
      confirmButtonColor: "#429f50",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        resetList();
        window.location.reload(); // 페이지 새로고침
      }
    });
  };

  const preventRefresh = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    if (!loading && !isLoginIn) {
      Swal.fire({
        icon: "error",
        text: "로그인 후 글 작성이 가능합니다.",
      }).then(() => navigate(-1));
    }

    window.scrollTo({ top: 0, left: 0 });
    window.addEventListener("beforeunload", preventRefresh);

    return () => {
      window.removeEventListener("beforeunload", preventRefresh);
    };
  }, [isLoginIn, loading, navigate]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <div>
      <UploadPageHeader />
      <UploadContainer>
        <div className="uploadHead">
          <p>*은 필수 질문 입니다.</p>
          <button onClick={resetClick}>
            RESET
            <Icon size="15px">
              <BiReset />
            </Icon>
          </button>
        </div>

        <Input name="질문 추가 *" placeholder="Q. 질문을 입력해주세요." />
        <TextArea
          name="상세 설명 추가"
          placeholder="상세 설명을 입력해주세요."
        />
        <AddChoice />
        <Category />
        <UploadButton />
      </UploadContainer>
    </div>
  );
};

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;

  .uploadHead > p {
    font-size: 12px;
    font-weight: 300;
    color: #dc6868;
    margin: 1rem 0 1rem 0;
    position: relative;
  }
  .uploadHead {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }

  .uploadHead > button {
    height: 35px;
    width: 70px;
    border: none;
    border-radius: 5px;
    background-color: #ff9c9cb1;
    box-shadow: 1.5px 2px 2px rgb(126, 126, 126);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #343434;
  }
  .uploadHead > button:hover {
    background-color: #e39b9b;
  }
`;

export default UploadPage;
