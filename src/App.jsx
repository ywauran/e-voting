import "./App.css";
import { Routes, Route } from "react-router-dom";
import Vote from "./pages/Vote";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      {/* <header>
        <Navigation />
      </header> */}
      <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
