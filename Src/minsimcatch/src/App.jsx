import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import routes from "./routes";
import MainPage from "./pages/main/MainPage";
import HotPage from "./pages/hot/HotPage";
import CompletePage from "./pages/complete/CompletePage";
import MyPage from "./pages/my/Mypage";
import MyQuestionPage from "./pages/my/MyQuestionPage";
import MyParticipatePage from "./pages/my/MyParticipatePage";
import UploadPage from "./pages/upload/UploadPage";
import SearchPage from "./pages/search/SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={routes.signup} element={<SignUpPage />}></Route>
        <Route path={routes.login} element={<LoginPage />}></Route>

        <Route path={routes.home} element={<MainPage />}></Route>
        <Route path={`${routes.home}:id`} element={<MainPage modal={true} />}></Route>

        <Route path={routes.hot} element={<HotPage />}></Route>
        <Route path={`${routes.hot}:id`} element={<HotPage modal={true} />}></Route>

        <Route path={routes.complete} element={<CompletePage />}></Route>
        <Route path={`${routes.complete}:id`} element={<CompletePage modal={true} />}></Route>

        <Route path={routes.mypage} element={<MyPage />}></Route>
        <Route path={`${routes.search}/:query`} element={<SearchPage />}></Route>

        <Route path={routes.myquestion} element={<MyQuestionPage />}></Route>
        <Route path={`${routes.myquestion}:id`} element={<MyQuestionPage />}></Route>
        <Route path={`${routes.myparticipation}:id`} element={<MyParticipatePage />}></Route>
        <Route path={routes.myparticipation} element={<MyParticipatePage />}></Route>
        <Route path={routes.upload} element={<UploadPage />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
