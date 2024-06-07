import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { HomeContainer } from "@/styles/Container";
import SearchInput from "@/components/search/SearchInput";
import HomeTemplate from "@/components/template/HomeTemplate";
import Footer from "@/components/layouts/footers/Footer";
import Loader from "@/assets/Loader";
import NonePage from "@/components/common/NonePage";
import styled from "styled-components";

const SearchPage = () => {
  const { query } = useParams();
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const surveysRef = ref(db, 'surveys');

    const unsubscribe = onValue(surveysRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const surveysArray = Object.entries(data).map(([id, survey]) => {
          const optionsObject = survey.options || {};
          const optionsArray = Object.entries(optionsObject).map(([optionId, optionDetails]) => ({
            id: optionId,
            ...optionDetails
          }));
          const totalCount = optionsArray.reduce((sum, option) => sum + (option.votes || 0), 0);
          return {
            id,
            ...survey,
            options: optionsArray,
            totalCount,
            active: survey.active  // 설문 상태 추가
          };
        });
        setSurveys(surveysArray);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, (error) => {
      console.error("Error loading data:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = surveys.filter(
        survey => survey.title.includes(query) || survey.content.includes(query)
      );
      setFilteredSurveys(filtered);
    } else {
      setFilteredSurveys(surveys);
    }
  }, [query, surveys]);

  return (
    <HomeContainer>
      <SearchWrapper>
        <SearchInput />
      </SearchWrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredSurveys.length === 0 ? (
            <NonePage what="search" query={query} />
          ) : (
            <HomeTemplate
              datas={filteredSurveys.map(survey => ({
                ...survey,
                disableVote: survey.active === "complete" // 투표 비활성화 플래그 추가
              }))}
            />
          )}
        </>
      )}
      <Footer page="main" />
    </HomeContainer>
  );
};

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export default SearchPage;
