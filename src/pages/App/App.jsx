import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';
import WordPage from '../WordPage/WordPage';

function App() {
  const [user, setUser] = useState(getUser());



  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={<WordPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;
