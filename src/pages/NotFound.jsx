import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
      <br />
      <Link to="/" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>
        ← Return to Home
      </Link>
    </section>
  );
};

export default NotFound;
