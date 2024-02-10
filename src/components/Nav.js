import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Nav.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Propos from './propos';
import Annonce from './Annonce';
import Historique from './Historique';
import Message from './Message';
import Login from './Login';
import Recherche from './Recherche';
const Nav = () => {
  const [cliked, setCliked] = useState(false);
  const [data, setData] = useState([]);
  const handleClick = () => {
    setCliked(!cliked);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken != null) {
      console.log("ooooooooooooooooiiiiiiii");
      const fetchData = async () => {
        try {
          const response = await axios.get('https://webservice-production-66d9.up.railway.app/api/getInfoUser', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
          setData(response.data);
          console.log("aonaaaa"+ response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/Login';
  };

  return (
    <>
      <Router>
        <nav>
          <a href="index.html">
            <svg id="logo-15" width="49" height="48" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" className="ccustom" fill="#FF7A00"></path>
              <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" className="ccompli1" fill="#FF9736"></path>
              <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" className="ccompli2" fill="#FFBC7D"></path>
            </svg>
          </a>

          <div>
            <ul id="navbar">
              <li><Link to="/propos">Accueil</Link></li>
              <li><Link to="/Annonce">Annonces</Link></li>
              <li><Link to="/Message">Message</Link></li>
              <li><Link to="/Historique">Historique</Link></li>
              <li><Link to="/propos">Favoris</Link></li>
              <li><Link to="/Recherche">Filtre</Link></li>
              <button className="deconect" onClick={handleLogout}>Deconnexion</button>
            </ul>
            
            
          </div>

          <div id="mobile" onClick={handleClick}>
            <i id="bar" className={cliked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </nav>
        <Routes>
          <Route path="/Annonce" element={<Annonce />} />
          <Route path="/propos" element={<Propos />} />
          <Route path="/Historique" element={<Historique />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Recherche" element={<Recherche />} />
        </Routes>
      </Router>
    </>
  );
};

export default Nav;
