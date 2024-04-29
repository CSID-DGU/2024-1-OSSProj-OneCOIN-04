import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <RecoilRoot>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </CookiesProvider>
  </React.StrictMode>
);
