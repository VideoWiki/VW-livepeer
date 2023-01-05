import "./App.css";
import { Player } from "./Player";
import { Sample } from "./Sample";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./Upload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/player" element={<Player />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
