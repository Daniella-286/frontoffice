import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/message.css';

const Message = () => {
    const [data, setData] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [formData, setFormData] = useState({
        emeteur: '',
        recepteur: '',
        msg: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://webservice-production-66d9.up.railway.app/api/form', formData);
          console.log(response.data); // Afficher la réponse du backend
          // Réinitialiser le formulaire après l'envoi
          setFormData({ name: '', email: '', msg: '' });
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };
    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken != null) {
            try {
                const response1 = await axios.get('https://webservice-production-66d9.up.railway.app/api/getInfoUser', {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                });
                const message = await axios.get('https://webservice-production-66d9.up.railway.app/chat',{
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    },
                    params: {
                        id : response1.data.id_user
                    }
                    
                });; 
                setData(message.data);
                console.log(message.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }else{
            window.location.href = '/Login';
        }
        };
        fetchData();
    }, []);
return (
<div className="message-container">
      <div className="message-list">
        <div className="titre">
            <h3>Liste des Messages</h3>
        </div>
        <ul>
          <li>Message 1</li>
          <li>Message 2</li>
          <li>Message 3</li>
          <li>Message 4</li>
        </ul>
      </div>
      <div className="contenu">
      <div className="message-content">
        <h3>Robinson Daniella</h3>
        {data.map((message, index) => (
        <div className="message-content-body">
          <p className={message.recepteur === 1 ? 'black-text recu' : 'white-text recu'} key={index}>{message.messages}</p>
        </div>
        ))}
      </div>
      <div className="message-sender">
        <form onSubmit={handleSubmit}>
          <textarea
            value={formData.msg}
            onChange={handleChange} 
            placeholder="Entrez votre message..."
            required
          ></textarea>
          <button type="submit">Envoyer</button>
        </form>
      </div>
      </div>
    </div>
);
}

export default Message;
