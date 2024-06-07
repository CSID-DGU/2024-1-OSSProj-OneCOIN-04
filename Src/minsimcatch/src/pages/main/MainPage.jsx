import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import useLogin from "@/hooks/useLogin";
import Main from "@/components/layouts/headers/Main";
import Footer from "@/components/layouts/footers/Footer";
import HomeTemplate from "@/components/template/HomeTemplate";
import Loader from "@/assets/Loader";
import ErrorScreen from "@/components/common/ErrorScreen";
import NonePage from "@/components/common/NonePage";
import styled from "styled-components";
import { filterAndSortData } from "@/utils/sort";

const MainPage = () => {
    const [surveys, setSurveys] = useState([]);
    const [filteredSurveys, setFilteredSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isLoginIn, uid } = useLogin();
    const [sortType, setSortType] = useState("latest");
    const [category, setCategory] = useState("total");

    useEffect(() => {
        const db = getDatabase();
        const surveysRef = ref(db, "surveys");

        const unsubscribe = onValue(
            surveysRef,
            (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const surveysArray = Object.entries(data).map(([id, survey]) => {
                        const optionsObject = survey.options || {};
                        const optionsArray = Object.entries(optionsObject).map(
                            ([optionId, optionDetails]) => ({
                                id: optionId,
                                ...optionDetails,
                            })
                        );
                        const totalCount = optionsArray.reduce(
                            (sum, option) => sum + (option.votes || 0),
                            0
                        );
                        return {
                            id,
                            ...survey,
                            options: optionsArray,
                            totalCount,
                            userId: survey.userId,
                            commentsCount: survey.comments ? Object.keys(survey.comments).length : 0,
                            timestamp: survey.timestamp,
                        };
                    });
                    setSurveys(surveysArray);
                } else {
                    setError("No surveys available.");
                }
                setLoading(false);
            },
            (error) => {
                console.error("Error loading data:", error);
                setError(`Error loading data: ${error.message}`);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const sortedFilteredSurveys = filterAndSortData(surveys, category, sortType);
        setFilteredSurveys(sortedFilteredSurveys);
    }, [surveys, sortType, category]);

    const handleSortChange = (newSortType) => {
        setSortType(newSortType);
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    return (
        <>
            <Main
                page="main"
                onSortChange={handleSortChange}
                onCategoryChange={handleCategoryChange}
            />
            <ContentWrapper>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <ErrorScreen error="Error loading surveys" />
                ) : filteredSurveys.length === 0 ? (
                    <NonePage what="content" />
                ) : (
                    <HomeTemplate datas={filteredSurveys} error={error} modal={false} />
                )}
            </ContentWrapper>
            <Footer page="main" />
        </>
    );
};

export default MainPage;

const ContentWrapper = styled.div`
  padding-bottom: 80px; // Footer 높이만큼 패딩 추가
  min-height: calc(100vh - 60px); // Footer와 헤더를 뺀 높이 계산
  box-sizing: border-box; // Padding과 border를 포함한 box-sizing
`;
