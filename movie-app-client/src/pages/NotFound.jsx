import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found 🚫</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="back-home">← Go back to Home</Link>
    </div>
  );
};

export default NotFound;
