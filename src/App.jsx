import "./App.css";
import { Player } from "./Player";
import { Sample } from "./Sample";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./Upload";
import Navbar from "./Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/player" element={<Player />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
