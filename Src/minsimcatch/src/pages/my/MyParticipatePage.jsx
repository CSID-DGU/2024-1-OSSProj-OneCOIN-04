import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SubMyPageHeader from "@/components/layouts/headers/SubMyPageHeader";
import Footer from "@/components/layouts/footers/Footer";
import MyVoteList from "@/components/common/mypage/MyVoteList";
import { useNavigate } from "react-router-dom";
import routes from "@/routes";
import styled from "styled-components";
import { Palette } from "@/styles/Palette";
import { MyVoteContainer } from "@/styles/Container";
import Loader from "@/assets/Loader";

const MyParticipatePage = () => {
  const [surveys, setSurveys] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const database = getDatabase();

  useEffect(() => {
    const surveysRef = ref(database, 'surveys');
    const userVotesRef = ref(database, `user_votes/${user?.uid}`);

    const handleSurveys = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const surveysArray = Object.entries(data).map(([key, value]) => ({
          ...value,
          key: key,
          options: value.options ? Object.values(value.options) : [],
        }));
        // 내가 참여한 설문조사 필터링
        const filteredSurveys = surveysArray.filter(survey => userVotes[survey.key]);
        setSurveys(filteredSurveys);
      } else {
        setSurveys([]);
      }
      setLoading(false);
    };

    const handleUserVotes = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserVotes(data);
      } else {
        setUserVotes({});
      }
    };

    const unsubscribeSurveys = onValue(surveysRef, handleSurveys, (error) => {
      setError(`Error loading data: ${error.message}`);
      setLoading(false);
    });

    const unsubscribeUserVotes = onValue(userVotesRef, handleUserVotes, (error) => {
      setError(`Error loading data: ${error.message}`);
    });

    return () => {
      unsubscribeSurveys();
      unsubscribeUserVotes();
    };
  }, [user, userVotes]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <div>
      <SubMyPageHeader page="내가 참여한 투표" />
      <MyVoteContainer>
        {loading ? (
          <Loader />
        ) : surveys.length ? (
          <div>
            {surveys.map((data) => (
              <MyVoteList
                key={data.key}
                titleKey={data.key}
                data={data}
                route={routes.myparticipation}
              />
            ))}
          </div>
        ) : (
          <Box>
            <Text>
              참여한 투표가 없습니다. <br />
              당신의 생각을 <Goala>MinsimCatch</Goala>하세요!
            </Text>
            <div>
              <Button onClick={() => navigate(routes.hot)}>
                투표 하러가기
              </Button>
            </div>
          </Box>
        )}
      </MyVoteContainer>
      <Footer page="mypage" />
    </div>
  );
};

const Box = styled.div`
  margin-top: 10rem;
`;
const Text = styled.p`
  font-size: 17px;
  line-height: 2;
`;
const Goala = styled.span`
  color: ${Palette.font_blue};
  font-size: 1.5em;
`;

const Button = styled.button`
  letter-spacing: 0.25rem;
  color: #fff;
  font-size: 16px;
  width: 14rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: ${Palette.button_blue};
`;

export default MyParticipatePage;
