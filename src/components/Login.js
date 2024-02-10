import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Login.css';
const ContainLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    mdp: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://webservice-production-66d9.up.railway.app/api/login', formData);
      console.log(response.data); 
      if(response.data!==null){
        console.log("connecter lery"); 
        const newToken = response.data;
        localStorage.setItem('token', newToken);
        window.location.href = '/Annonce';
      }
      setFormData({ email: '', mdp: ''});
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
    return (
      <div className="annoncelogin-container ">
      <h1>Connection</h1>
      <form onSubmit={handleSubmit} className="norme">
          <div className="column">
              <div>
                  <label>Email:</label>
                  <input type="text" name="email" value={formData.email} id="email" onChange={handleChange}/>
              </div>
              <div>
                  <label>Mot de passe:</label>
                  <input type="password" name="mdp" value={formData.mdp} id="motDePasse" onChange={handleChange}/>
              </div>
          </div>
          <div className="buttons-container1">
              <button className="bokotra" type="submit">Se Connecter</button>
              <a href="/inscription" className="bokotra1" type="button">S'inscrire</a>
          </div>
      </form>
  </div>
   
    );
  };

export default ContainLogin ;