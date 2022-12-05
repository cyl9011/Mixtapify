import React from "react";

//import Login from "./components/Login/Login";
import Build from "./pages/Build/Build";
import Home from "./pages/Home/Home";
import Sender from "./pages/Sender/Sender";
import Recipient from "./pages/Recipient/Recipient";
import Choose from "./pages/Choose/Choose";
import Decorate from "./pages/Decorate/Decorate";
import Cassette from "./pages/Cassette/Cassette";

import { Route, Routes} from "react-router-dom";
import appRoutes from "./shared/appRoutes";

import "./App.css";

const App = () => {
  /*
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);
*/
  return (
    <div className="App">
      <div className="MainContent">
        <div>Test</div>
        <Routes>
          <Route path={appRoutes.home} element={<Home />} />
          <Route path={appRoutes.sender} element={<Sender />} />
          <Route path={appRoutes.recipient} element={<Recipient />} />
          <Route path={appRoutes.decorate} element={<Decorate />} />
          <Route path={appRoutes.choose} element={<Choose />} />
          <Route path={appRoutes.cassette} element={<Cassette />} />
          <Route path={appRoutes.notImplemented} element={<Build />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
