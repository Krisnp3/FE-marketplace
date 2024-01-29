import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import GraphTest from './pages/GraphTest/GraphTest';
import { useEffect, useState } from 'react';
import Stores from './pages/Stores/Stores';
import SubscriptionOver from './pages/SubscriptionOver/SubscriptionOver';
import StoreAnalytics from './pages/StoreAnalytics/StoreAnalytics';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <Header></Header>
      <div className="page-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/stores" element={<Stores/>} />
            <Route path="/subsover" element={<SubscriptionOver/>} />
            <Route path="/test" element={<GraphTest/>} />
            <Route path="/analytics" element={<StoreAnalytics/>} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
