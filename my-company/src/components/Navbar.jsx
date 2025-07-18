import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    backgroundColor: '#333',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s'
  };

  const linkHoverStyle = {
    ...linkStyle,
    backgroundColor: '#555'
  };

  return (
    <nav style={navStyle}>
      <Link 
        to="/" 
        style={linkStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Home
      </Link>
      <Link 
        to="/about" 
        style={linkStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        About
      </Link>
      <Link 
        to="/services" 
        style={linkStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Services
      </Link>
      <Link 
        to="/contact" 
        style={linkStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
