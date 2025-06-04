import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', paddingBottom: '3rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
