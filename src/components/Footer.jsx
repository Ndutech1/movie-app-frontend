import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} MovieVerse 🎬 | Built with ❤️ by Ndutech</p>
    </footer>
  );
};

export default Footer;
