import "./App.css";
import { Routes, Route } from "react-router-dom";
import Vote from "./pages/Vote";
import Home from "./pages/Home";

function App() {
  return (
    <>
      {/* <header>
        <Navigation />
      </header> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
