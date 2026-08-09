import { NavLink } from 'react-router-dom';

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
      <div className="profile-container" style={{ textAlign: 'center', margin: '15px 0' }}>
        <img 
          src="/assets/IMG_5630.jpeg" 
          alt="Srivathsava Rebba" 
          className="profile-pic"
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
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