import './Spinner.css';

const Spinner = () => {
  return (
    <div className="preloader">
      <div className="row">
        <div className="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="lading"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;