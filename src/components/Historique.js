import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Historique.css';
import car from '../assets/images/voiture.png';

const Historique = () => {
    const [data, setData] = useState([]);

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
                    console.log(response1.data);
                    const response = await axios.get('https://webservice-production-66d9.up.railway.app/historique',{params:{id:response1.data.id_user}}); 
                    setData(response.data);
                    console.log(response.data);
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
        <div className="historique-container">
            {data.map((item)=>(<div className="historique-item">
                <div className="historique-item-header">
                    <div className="historique-item-user">{item.nom} {item.prenom}</div>
                    <div className="historique-item-date">{item.dateAnnonce}</div>
                </div>
                <div className="historique-item-content">
                    <img src={car} alt="Description de l'image" />
                    <div className="historique-item-details">{item.detail}</div>
                </div>
            </div>
            ))}
        </div>
    );
}

export default Historique;
