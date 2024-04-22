import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');  // 로그인 성공 후 홈 페이지로 리디렉트
        } catch (error) {
            alert(`로그인 실패: ${error.message}`);  // 로그인 실패 시 오류 메시지 표시
        }
    };

    return (
        <div>
            <h1>로그인</h1>
            <form onSubmit={handleLogin}>
                <label>
                    이메일:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default Login;
