import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'

function App() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Simulating checking for a logged in user from localStorage (like in app.ts)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser && storedUser !== 'guest') {
      const name = localStorage.getItem('currentUserName') || storedUser.split('@')[0];
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserName');
    setUserName(undefined);
    window.location.reload(); // Refresh to update state
  };

  return (
    <div className="app-container">
      <Header userName={userName} onLogout={handleLogout} />
      <Home />
      <Footer />
    </div>
  )
}

export default App
