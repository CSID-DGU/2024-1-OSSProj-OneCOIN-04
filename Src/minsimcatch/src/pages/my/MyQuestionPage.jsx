import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SubMyPageHeader from "@/components/layouts/headers/SubMyPageHeader";
import Footer from "@/components/layouts/footers/Footer";
import MyVoteList from "@/components/common/mypage/MyVoteList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import routes from "@/routes";
import { Palette } from "@/styles/Palette";
import { MyVoteContainer } from "@/styles/Container";
import Loader from "@/assets/Loader";

const MyQuestionPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const database = getDatabase();

  const [key,setKey] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const surveysRef = ref(db, 'surveys');

    const unsubscribe = onValue(surveysRef, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const surveysArray = Object.entries(data).map(([key, value]) => ({
          ...value,
          key: key, // 각 survey의 key 값을 추가
          options: value.options ? Object.values(value.options) : []
        }));

        const userSurveys = surveysArray.filter(survey => survey.userId === user?.uid);
        
        setSurveys(userSurveys);
        setLoading(false);
      } else {
        setSurveys([]);
        setLoading(false);
      }
    }, (error) => {
      setError(`Error loading data: ${error.message}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <div>
      <SubMyPageHeader page="내가 한 질문" />
      <MyVoteContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
            {surveys.length ? (
              <div>
                {surveys.map((survey) => (
                  <MyVoteList titleKey={survey.key} key={survey.userId} data={survey} route={routes.myquestion} />
                ))}
              </div>
            ) : (
              <Box>
                <Text>
                  내가 한 질문이 없습니다. <br />
                  첫 질문을 작성해보세요! <br />
                  당신의 고민을 <Goala>MinsimCatch</Goala>하세요!
                </Text>
                <div>
                  <Button onClick={() => navigate(routes.upload)}>
                    질문 작성 하러가기
                  </Button>
                </div>
              </Box>
            )}
          </>
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
  font-size: 20px;
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

export default MyQuestionPage;
