import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/mainPage/mainPage";
import { NavBar } from "./components/navBar/navBar";
import { ChatPage } from "./pages/chatPage/chatPage";
import { ThemeProvider } from "@emotion/react";
import theme from "./themeProvider";
import ROUTES from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.CHAT} element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
