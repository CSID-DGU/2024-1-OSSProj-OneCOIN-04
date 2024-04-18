import React, { useState } from "react";
import { auth } from '../firebase-config'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('회원가입이 성공적으로 완료되었습니다!');
            // 회원가입 후 추가적인 동작 (예: 홈 페이지로 리디렉트)
        } catch (error) {
            alert('회원가입 중 오류가 발생했습니다: ' + error.message);
        }
    };

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSignUp}>
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
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
export default Register;
