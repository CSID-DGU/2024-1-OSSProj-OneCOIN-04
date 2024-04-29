import React, { useState } from 'react';
import styled from 'styled-components';
import { GoChevronLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import Button from "../../components/login/Button";
import InputGroup from "../../components/login/InputGroup";
import { JoinContainer } from "../../styles/Container";
import useValid from "../../hooks/useValid";
import routes from "@/routes";
import Swal from "sweetalert2";
import { auth, database } from '@/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, query, orderByChild, equalTo, get } from 'firebase/database';

const SignUpPage = () => {
  const [value, setValue] = useState({ name: "", email: "", password: "", passwordConfirm: "" });
  const [agreeService, setAgreeService] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const { validText, isValid } = useValid(value);
  const navigate = useNavigate();

  const handleAllAgree = (event) => {
    const { checked } = event.target;
    setAgreeService(checked);
    setAgreePolicy(checked);
  };

  const handleAgree = (event) => {
    const { name, checked } = event.target;
    if (name === "service-agree") {
      setAgreeService(checked);
    } else if (name === "policy-agree") {
      setAgreePolicy(checked);
    }
  };

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setValue(prev => ({ ...prev, [id]: value }));
  };

  const handleEmailCheck = async () => {
    const exists = await checkEmailExists(value.email);
    if (exists) {
      Swal.fire("오류", "이미 사용중인 이메일입니다.", "error");
    } else {
      Swal.fire("성공", "사용 가능한 이메일입니다.", "success");
    }
  };

  const handleNicknameCheck = async () => {
    const exists = await checkNicknameExists(value.name);
    if (exists) {
      Swal.fire("오류", "이미 사용중인 닉네임입니다.", "error");
    } else {
      Swal.fire("성공", "사용 가능한 닉네임입니다.", "success");
    }
  };
  const checkEmailExists = async (email) => {
    const usersRef = ref(database, 'users');
    const queryRef = query(usersRef, orderByChild('email'), equalTo(email));
    const snapshot = await get(queryRef);
    return snapshot.exists();
  };
  
  const checkNicknameExists = async (nickname) => {
    const usersRef = ref(database, 'users');
    const queryRef = query(usersRef, orderByChild('nickname'), equalTo(nickname));
    const snapshot = await get(queryRef);
    return snapshot.exists();
  };

  const handleSignUp = async () => {
  if (isValid.isName && isValid.isEmail && isValid.isPassword && isValid.isPasswordConfirm && agreeService && agreePolicy) {
    const emailExists = await checkEmailExists(value.email);
    const nicknameExists = await checkNicknameExists(value.name);
    if (!emailExists && !nicknameExists) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
        const user = userCredential.user;
        if (user && user.uid) { // uid의 존재를 확인
          await set(ref(database, 'users/' + user.uid), {
            nickname: value.name,
            email: value.email
          });
          Swal.fire("가입 성공!", "회원가입이 완료되었습니다.", "success");
          navigate(routes.home);
        } else {
          throw new Error("User object is undefined or UID is missing"); // uid가 없는 경우 에러 처리
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        Swal.fire("가입 오류", error.message, "error");
      }
    } else {
      Swal.fire("오류", "이메일 또는 닉네임이 이미 사용 중입니다.", "error");
    }
  } else {
    Swal.fire("오류", "입력 내용을 확인해주세요.", "error");
  }
};

  return (
    <JoinContainer>
      <Header>
        <StyledIcon onClick={() => navigate(-1)}>
          <GoChevronLeft />
        </StyledIcon>
        <Title>Goalajuma</Title>
      </Header>
      <Group>
        <InputContainer>
          <InputGroup
            className="name"
            id="name"
            type="name"
            placeholder="닉네임을 입력해주세요"
            label="닉네임"
            value={value.name}
            onChange={handleOnChange}
          />
          <StyledButton onClick={handleNicknameCheck} disabled={!value.name}>
            중복 검사
          </StyledButton>
          <StyledErr name="name">{validText.nameText}</StyledErr>
        </InputContainer>
        <InputContainer>
          <InputGroup
            className="email"
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            label="Email"
            value={value.email}
            onChange={handleOnChange}
          />
          <StyledButton onClick={handleEmailCheck} disabled={!value.email}>
            중복 검사
          </StyledButton>
          <StyledErr email="email">{validText.emailText}</StyledErr>
        </InputContainer>
        <InputGroup
          className="password"
          id="password"
          type="password"
          placeholder="8글자 이상 입력해주세요"
          label="비밀번호"
          value={value.password}
          onChange={handleOnChange}
        />
        <StyledErr>{validText.passwordText}</StyledErr>
        <InputGroup
          className="passwordConfirm"
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          label="비밀번호 확인"
          value={value.passwordConfirm}
          onChange={handleOnChange}
        />
        <StyledErr>{validText.passwordConfirmText}</StyledErr>
      </Group>
      <PolicyGroup>
        <Policy>
          <input
            type="checkbox"
            name="all-agree"
            checked={agreeService && agreePolicy}
            onChange={handleAllAgree}
          />
          <label htmlFor="all-agree">전체 동의</label>
        </Policy>
        <Policy>
          <input
            type="checkbox"
            name="service-agree"
            checked={agreeService}
            onChange={handleAgree}
          />
          <label htmlFor="service-agree">서비스 이용 약관 동의</label>
        </Policy>
        <Policy>
          <input
            type="checkbox"
            name="policy-agree"
            checked={agreePolicy}
            onChange={handleAgree}
          />
          <label htmlFor="policy-agree">개인 정보 수집 동의</label>
        </Policy>
      </PolicyGroup>
      <ButtonGroup>
        <Button
          color="#9EB0EA"
          onClick={handleSignUp}
          disabled={
            isValid.isName &&
            isValid.isEmail &&
            isValid.isPassword &&
            isValid.isPasswordConfirm &&
            agreeService &&
            agreePolicy
              ? false
              : true
          }
        >
          가입 완료
        </Button>
      </ButtonGroup>
      <DuplicateErr>
        {!isValid.isName ||
        !isValid.isEmail ||
        !isValid.isPassword ||
        !isValid.isPasswordConfirm ||
        !agreeService ||
        !agreePolicy
          ? "모든 필드를 채우고 중복검사 및 약관 동의를 완료해주세요."
          : ""}
      </DuplicateErr>
    </JoinContainer>
  );
};

export default SignUpPage;



const Header = styled.div`
  display: flex;
  position: relative;
  width: 360px;
  bottom: 25px;
`;
const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  align-items: center;
`;
const InputContainer = styled.div`
  height: 100px;
  margin-bottom: 5px;
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 15px;
`;
const StyledIcon = styled.button`
  border: none;
  background: none;
  font-size: 35px;
  margin: 0 5px;
`;
const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #9eb0ea;
  position: relative;
  bottom: 3px;
  left: 25px;
`;
const StyledButton = styled.button`
  border-radius: 50px;
  border: 1px solid transparent;
  font-size: 13px;
  background-color: #9eb0ea;
  padding: 0.6em;
  font-weight: 500;
  color: #fff;
  position: relative;
  width: 30%;
  bottom: 40px;
  left: 90px;
  cursor: pointer;
  &:hover {
    background-color: #8c9ccf;
  }
`;
const PolicyGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  bottom: 20px;
  left: 10px;
  text-align: left;
  margin-top: 50px;
`;
const Policy = styled.div`
  display: flex;
  gap: 5px;
`;
const StyledErr = styled.div`
  color: #e45151;
  font-size: 12px;
  position: relative;
  right: ${props => (props.name === 'name' ? '50px' : props.email === 'email' ? '65px' :'60px')};
  bottom: ${props => (props.name === 'name' ? '27px' : props.email === 'email' ? '17px' :'10px')};
`;
const DuplicateErr = styled.div`
  color: #e45151;
  font-size: 13px;
  position: relative;
  right: 8px;
  top: 20px;
  align-items: center;
`;
