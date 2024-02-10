import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/annonce.css';
import carImage from '../assets/images/voit1.PNG';

const Annonce = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showFormIndex, setShowFormIndex] = useState(null);
    const [formData, setFormData] = useState({
        recepteur: '',
        message: ''
    });
    const [fav, setFav] = useState({
        pub : '',
        user : ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          //const response = await axios.post('https://webservice-production-dbfd.up.railway.app/api/form', formData);
          //console.log(response.data); // Afficher la réponse du backend
          // Réinitialiser le formulaire après l'envoi
          //setFormData({ recepteur : '', message: '' });
          const storedToken = localStorage.getItem('token');
            if (storedToken != null) {
                try {
                const response1 = await axios.get('https://webservice-production-66d9.up.railway.app/api/getInfoUser', {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                console.log("hbhjdbchc"+response1.data.id_user);
                const response = await axios.get('https://webservice-production-66d9.up.railway.app/sendMsg', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                },
                params: {
                    emetteur: response1.data.id_user,
                    recepteur: formData.recepteur,
                    msg:formData.message
                }
                
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        window.location.href = '/Login';
        console.log("Connectez-vous pour pouvoir envoyer");
    }
          console.log(formData.message);
          console.log(formData.recepteur);
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://webservice-production-66d9.up.railway.app/annonceValider'); 
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const toggleDetails = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };
    const toggleForm = (index) => {
        const storedToken = localStorage.getItem('token');
        if(storedToken!=null){
            setShowFormIndex(showFormIndex === index ? null : index);
        }else{
            window.location.href = '/Login';
            console.log("Connecter vous pour pouvoir envoyer");
        }
        
    };
    const toggleFavoris = async (index,value) => {
        console.log('Valeur envoyée aux favoris :', value);
        const storedToken = localStorage.getItem('token');
        if(storedToken!=null){
            try {
                const response = await axios.get('https://webservice-production-66d9.up.railway.app/api/getInfoUser', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
                setData1(response.data);
                console.log(response.data);
                fav.pub = value;
                fav.user = response.data.id_user;
                console.log(response.data.id_user);
                const response1 = await axios.get('https://webservice-production-66d9.up.railway.app/ajoutfavoris', {
                params: {
                    id_annonce: value,
                    id_user: response.data.id_user
                },

            });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }else{
            window.location.href = '/Login';
            console.log("Connecter vous pour pouvoir envoyer");
        }
        
    };
    return (
        <div className="anatiny">
            {data.map((item, index) => (
                <div key={index} className={`annonce-card ${index === expandedIndex ? 'expanded' : ''}`}>
                    <div className="annonce-item">
                        <div className="image-container">
                            <img src={item.photo} alt="Voiture" className="car-image" />
                        </div>
                        <div className="annonce-details">
                            <h2>{item.title}</h2>
                            <p>Auteur : <span>{item.nom} {item.prenom}</span></p>
                            <p>Modèle : <span>{item.model}</span></p>
                            <p>Catégorie : <span>{item.categorie}</span></p>
                            <p>Prix : <span>$ {item.prix}</span></p>
                            <button className="detail-button" onClick={() => toggleDetails(index)}>Voir plus  <i className="fas fa-chevron-down"></i></button>
                            {expandedIndex === index && (
                                <div className="detail">
                                    <p>Detail : <span>{item.detail}</span></p>
                                    <p>Etat : <span>{item.defauts}</span></p>
                                </div>
                            )}
                            {showFormIndex === index && (
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name="recepteur" hidden="hidden" value={formData.recepteur = item.id_user} onChange={handleChange} />
                                    <div className="text">
                                        <textarea name="message" value={formData.message} onChange={handleChange} ></textarea>
                                    </div>
                                    <div className="envoyer-button">
                                        <button> Envoyer</button>
                                    </div>
                                </form>
                             )}
                            
                            <div className="buttons-container">
                                <button className="fas fa-envelope contact-button" onClick={() => toggleForm(index)}> Contacter</button>
                                <button className="fas fa-heart fav-button" onClick={() => toggleFavoris(index,item.id_annonce)}> Ajouter aux favoris</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Annonce;
