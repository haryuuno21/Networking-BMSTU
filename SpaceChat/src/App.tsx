import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/mainPage/mainPage";
import { NavBar } from "./components/navBar/navBar";
import { ChatPage } from "./pages/chatPage/chatPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
