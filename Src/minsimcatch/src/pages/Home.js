import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

function Home() {
    const [user, setUser] = useState(null);
    const [nickname, setNickname] = useState('');
    const [name, setName]= useState('')
    const navigate = useNavigate();
    const auth = getAuth();
    const database = getDatabase();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const userRef = ref(database, 'users/' + user.uid);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setNickname(data.nickname);//데이터베이스에서 닉네임 
                        setName(data.name); // 데이터베이스에서 이름을 가져옴
                    }
                });
            } else {
                setUser(null);
                setNickname('');
                setName(''); // 로그아웃 시 닉네임 초기화
            }
        });
    }, [auth, database]);

    const logout = () => {
        auth.signOut();
        navigate('/');
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {nickname || name}!</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                </div>
            )}
        </div>
    );
}

export default Home;
