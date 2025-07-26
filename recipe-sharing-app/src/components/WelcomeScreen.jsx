import logohero from '../assets/img/recipe-book.png';
import '../assets/css/WelcomeScreen.css';

const WelcomeScreen = ({ fadeOut }) => {
  return (
    <div className={`welcome-screen ${fadeOut ? 'fade-out' : ''}`}>
      <img src={logohero} alt="Welcome to Recipe Sharing App" className="welcome-image" />
      <h1 className="welcome-title">Welcome to your Recipe Sharing App</h1>
      <p className="welcome-subtitle">Discover and share amazing recipes</p>
    </div>
  );
};

export default WelcomeScreen;
