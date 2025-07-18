function Footer() {
  const footerStyle = {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    marginTop: '50px'
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 Our Company. All rights reserved. | Built with React</p>
    </footer>
  );
}

export default Footer;
