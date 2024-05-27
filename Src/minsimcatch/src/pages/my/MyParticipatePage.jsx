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
import useLogin from "@/hooks/useLogin";

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
    const db = getDatabase();
    const surveysRef = ref(db, 'surveys');
    const userVotesRef = ref(db, 'user_votes');

    const unsubscribeSurveys = onValue(surveysRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        const surveysArray = Object.entries(data).map(([key, value]) => ({
          ...value,
          key: key,
          options: value.options ? Object.values(value.options) : []
        }));

        if (user && userVotes[user.uid]) {
          const participatedSurveyIds = Object.keys(userVotes[user.uid]);
          const userSurveys = surveysArray.filter(survey => participatedSurveyIds.includes(survey.key));
          setSurveys(userSurveys);
        } else {
          setSurveys([]);
        }
        setLoading(false);
      } else {
        setSurveys([]);
        setLoading(false);
      }
    }, (error) => {
      setError(`Error loading data: ${error.message}`);
      setLoading(false);
    });

    const unsubscribeUserVotes = onValue(userVotesRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setUserVotes(data);
      } else {
        setUserVotes({});
      }
    }, (error) => {
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
        {!loading ? (
          surveys.length ? (
            <div>
              {surveys.map((data) => (
                <MyVoteList titleKey={data.key} key={data.key} data={data} route={routes.myparticipation} />
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
          )
        ) : (
          <Loader />
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
