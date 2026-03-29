import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage.js'
import FlavorsPage from './components/FlavorsPage.js'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flavors" element={<FlavorsPage />} />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
