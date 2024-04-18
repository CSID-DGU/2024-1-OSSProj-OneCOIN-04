import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    // 이메일과 비밀번호 검증을 위한 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 최소 하나의 문자 및 하나의 숫자

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!emailRegex.test(email)) {
            alert("유효하지 않은 이메일 형식입니다.");
            return;
        }
        if (!passwordRegex.test(password)) {
            alert("비밀번호는 8자 이상이며, 최소 하나의 문자와 하나의 숫자를 포함해야 합니다.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Realtime Database에 사용자 정보 저장
            const database = getDatabase();
            set(ref(database, 'users/' + user.uid), {
                name: name,
                gender: gender,
                email: email,
                nickname: nickname,
                surveysCount: 0,
                profileImageUrl: null
            }).then(() => {
                console.log("User data saved successfully.");
                alert('회원가입이 성공적으로 완료되었습니다!');
                navigate('/');
            }).catch((error) => {
                console.error("Error saving user data:", error);
                alert('회원가입 정보 저장 중 오류가 발생했습니다: ' + error.message);
            });
        } catch (error) {
            alert('회원가입 중 오류가 발생했습니다: ' + error.message);
        }
    };


    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    이름:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <br />
                <label>
                    성별:
                    <select value={gender} onChange={e => setGender(e.target.value)} required>
                        <option value="">성별 선택</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                        <option value="unspecified">선택하지 않음</option>
                    </select>
                </label>
                <br />
                <label>
                    이메일:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <br />
                <label>
                    닉네임:
                    <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} required />
                </label>
                <br />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Register;
