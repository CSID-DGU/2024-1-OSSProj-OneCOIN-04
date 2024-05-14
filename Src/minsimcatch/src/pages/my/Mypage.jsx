import React, { useEffect, useState } from 'react';
import { auth, database } from '@/firebase-config';
import { ref, get } from 'firebase/database'; // Firestore 대신 Realtime Database 사용
import { useNavigate } from 'react-router-dom';
import useLogin from '@/hooks/useLogin';
import Profile from "@/components/common/mypage/Profile";
import { MyContainer } from "@/styles/Container";
import MyPageUl from "@/components/common/mypage/MyPageUl";
import MyPageHeader from "@/components/layouts/headers/MyPageHeader";
import Footer from "@/components/layouts/footers/Footer";

const Mypage = () => {
  const isLogIn = useLogin();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!isLogIn) {
      navigate('/'); // 로그인하지 않은 경우 메인페이지로 이동
      return;
    }
    
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const userRef = ref(database, `users/${auth.currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchProfile();
  }, [isLogIn, navigate]);

  return (
    <div>
      <MyPageHeader />
      <MyContainer>
        <Profile
          userName={profile?.nickname}
          email={profile?.email}
          src={"./vv.jpg"}
        ></Profile>
        <MyPageUl
          votingNumber={profile?.participateVoteCount}
          questionNumber={profile?.createVoteCount}
          data={profile}
        ></MyPageUl>
      </MyContainer>
      <Footer page="mypage" />
    </div>
  );
};

export default Mypage;
