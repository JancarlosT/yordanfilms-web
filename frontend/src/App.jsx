import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Precios from "./pages/Precios";
import Agendar from "./pages/Agendar";
import Portafolio from "./pages/Portafolio";
import PortafolioCategoria from "./pages/PortafolioCategoria";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/precios" element={<Precios />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/portafolio/:slug" element={<PortafolioCategoria />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;