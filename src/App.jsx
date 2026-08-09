import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';

const App = () => {
  // 1. State: Dark/Light theme toggle lifted to the top level
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // 2. Side Effect: Persist theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Apply the theme as a class to the body tag so CSS can use it
    document.body.className = theme; 
  }, [theme]);

  // Function to toggle the state
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      {/* Passing theme and toggle function as props to Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* 404 Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;