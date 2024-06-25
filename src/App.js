import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Form from "./scenes/form";
import Line from "./scenes/line";
import LineUpdate from "./scenes/lineupdate";
import SupersetEmbed from "./scenes/superset";
import Tables from "./scenes/table";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Login from "./scenes/Login"; // import halaman login
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state untuk status login
  const [username, setUsername] = useState('');

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isLoggedIn && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route
                path="/login"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path="*"
                element={isLoggedIn ? <PrivateRoutes /> : <Navigate to="/login" />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/form" element={<Form />} />
      <Route path="/table" element={<Tables />} />
      <Route path="/line" element={<Line />} />
      <Route path="/superset" element={<SupersetEmbed />} />
      <Route path="/lineupdate" element={<LineUpdate />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/geography" element={<Geography />} />
    </Routes>
  );
};

export default App;
