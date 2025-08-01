import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'

function App() {

  return (
    <>
      <Header />
      <MainContent />
      <Footer />

      <UserProfile name="JohnDoes" age={30} bio="Web Developer" />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />

    </>
  )
}

export default App
