import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage.js'
import SignupPage from './components/SignupPage.js'
import FlavorsPage from './components/FlavorsPage.js'
import OrderHistoryPage from './components/OrderHistoryPage.js'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flavors" element={<FlavorsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
