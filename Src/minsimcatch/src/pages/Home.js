// src/pages/Home.js
import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.email}!</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => navigate('/login')}>로그인</button>
                    <button onClick={() => navigate('/register')}>회원가입</button>
                </div>
            )}
        </div>
    );
}

export default Home;
