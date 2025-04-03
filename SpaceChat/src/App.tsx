import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/mainPage/mainPage";
import { NavBar } from "./components/navBar/navBar";
import { ChatPage } from "./pages/chatPage/chatPage";
import { ThemeProvider } from "@emotion/react";
import theme from "./themeProvider";
import ROUTES from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MarsChatPage } from "./pages/marsChatPage/marsChatPage";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path={ROUTES.HOME} index element={<HomePage />} />
            {import.meta.env.VITE_IS_MARS ? (
              <Route path={ROUTES.CHAT} element={<MarsChatPage />} />
            ) : (
              <Route path={ROUTES.CHAT} element={<ChatPage />} />
            )}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
