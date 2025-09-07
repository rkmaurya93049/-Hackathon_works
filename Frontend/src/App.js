import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './component/header/Head';
import Hero from './component/Hero/Hero';
import Footer from './component/Footer/Footer';
import Login from './component/Login/Login';
import Sign from './component/Signup/Signup';
import FeaturesSection from './component/FeaturesSection/FeaturesSection';
import CropYieldForm from './component/CropYieldForm';
import About from './component/About';
import Signin from './component/Signup/Signup';

function Home() {
  return (
    <div className="home">
      <div
        className="hero-wrapper"
        style={{ backgroundImage: `url("/background1.jpg")` }}
      >
        <Hero />
      </div>
      <FeaturesSection />
    </div>
  );
}

function App() {
  return (
    <Router>
    
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signin" element={<Sign />} />
        <Route path="/predict" element={<CropYieldForm />} />
        <Route path="/about" element={<About />} />
      </Routes>

      
      <Footer />
    </Router>
  );
}

export default App;
