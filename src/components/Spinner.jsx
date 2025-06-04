import '../styles/Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Spinner;
