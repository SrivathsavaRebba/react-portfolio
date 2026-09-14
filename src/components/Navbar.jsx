import { NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <header>
      <h1>Srivathsava Rebba - Portfolio</h1>
      <nav>
        <ul>
          <li><NavLink to="/Home">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>
      
      {/* Profile Picture */}
      <div className="profile-container">
        <img 
          src="/assets/IMG_5630.jpeg" 
          alt="Srivathsava Rebba" 
          className="profile-pic"
        />
      </div>

      {/* Theme Toggle Button */}
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </header>
  );
};

export default Navbar;