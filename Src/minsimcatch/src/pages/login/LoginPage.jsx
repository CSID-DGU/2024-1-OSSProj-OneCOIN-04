import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GoChevronLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import Button from "@/components/login/Button";
import InputGroup from "@/components/login/InputGroup";
import { MainContainer } from "@/styles/Container";
import useValid from "@/hooks/useValid";
import routes from "@/routes";
import { useSetRecoilState } from "recoil";
import { isLoginInState } from "@/utils/AuthAtom";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase-config';

const LoginPage = () => {
  const setisLoginIn = useSetRecoilState(isLoginInState);
  const [value, setValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { validText, isValid } = useValid(value);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setisLoginIn(true);
        navigate(routes.home); // Ensure to redirect to the home or intended page
      }
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, [setisLoginIn, navigate]);

  const handleLogin = async () => {
    if (isValid.isEmail && isValid.isPassword) {
      try {
        await signInWithEmailAndPassword(auth, value.email, value.password);
        // Successful login will trigger the onAuthStateChanged listener
      } catch (error) {
        alert("로그인 실패: " + error.message);
      }
    } else {
      alert("입력 내용이 올바르지 않습니다.");
    }
  };

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setValue(prev => ({ ...prev, [id]: value }));
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <MainContainer>
      <Header>
        <StyledIcon onClick={() => navigate(-1)}>
          <GoChevronLeft />
        </StyledIcon>
      </Header>
      <Subheader>
        <span>계정이 없으신가요?</span>
        <button
          onClick={() => {
            navigate(routes.signup);
          }}
        >
          회원가입하기
        </button>
      </Subheader>
      <Group>
        <InputGroup
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          label="Email"
          value={value.email}
          valid={!isValid.isEmail}
          onChange={handleOnChange}
          onKeyDown={handleEnterKey}
        />
        <InputGroup
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          label="비밀번호"
          value={value.password}
          valid={!isValid.isPassword}
          onChange={handleOnChange}
          onKeyDown={handleEnterKey}
        />
        <Button
          onClick={handleLogin}
          disabled={!isValid.isEmail || !isValid.isPassword}
        >
          로그인
        </Button>
      </Group>
    </MainContainer>
  );
};

export default LoginPage;


// 스타일 컴포넌트 정의는 기존과 동일합니다.


const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #9eb0ea;
  position: relative;
  bottom: 3px;
  left: 25px;
`;
const Header = styled.div`
  display: flex;
  position: relative;
  width: 360px;
`;
const Subheader = styled.div`
  font-size: 16px;
  position: relative;
  top: 30px;
  button {
    margin-left: 40px;
    color: gray;
    border: none;
    padding: 8px 15px;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
      background-color: #d3d3d6;
    }
  }
`;
const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
  top: 50px;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
  top: 50px;
  .firstButton {
    margin-top: 50px;
  }
`;
const StyledIcon = styled.button`
  border: none;
  color: #FD9F28;
  background: none;
  font-size: 35px;
  margin: 0 5px;
  cursor: pointer;
`;
const StyledErr = styled.div`
  color: #e45151;
  font-size: 13px;
  position: relative;
  right: 60px;
  bottom: 10px;
`;
