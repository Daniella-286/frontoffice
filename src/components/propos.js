import { Component } from 'react';
import '../assets/css/propos.css';
import React, { useEffect, useState } from 'react';
// Importez le fichier de style CSS pour cette page

const AboutPage = () => {
    //const DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/tahirintsary-8ccaa.appspot.com/o/5551cabc-98a8-4966-a135-7bc6cfc7be22.PNG?alt=media";
    return (
        
        <div className="about-container">
            <section className="section">
                <h2 className="section-heading">Notre Mission</h2>
                <p className="paragraph">Nous sommes dédiés à offrir à nos clients une expérience de recherche et d'achat de voitures d'occasion simple, transparente et satisfaisante.</p>
            </section>
            
            <section className="section">
                <h2 className="section-heading">Notre Sélection</h2>
                <p className="paragraph">Notre objectif est de vous aider à trouver la voiture parfaite qui répond à vos besoins et à votre budget. Que vous recherchiez une voiture compacte, une berline familiale, un SUV robuste ou une voiture de sport élégante, nous avons une large gamme de véhicules d'occasion de haute qualité à choisir.</p>
            </section>
            
            <section className="section">
                <h2 className="section-heading">Notre Qualité</h2>
                <p className="paragraph">Nous travaillons avec des vendeurs de confiance pour vous offrir une sélection diversifiée de voitures d'occasion certifiées, vérifiées et bien entretenues. Chaque voiture est soigneusement inspectée pour assurer sa qualité et sa fiabilité.</p>
            </section>
            
            <section className="section">
                <h2 className="section-heading">Notre Engagement</h2>
                <p className="paragraph">Explorez notre inventaire en ligne pour trouver la voiture de vos rêves dès aujourd'hui. Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à nous contacter. Notre équipe sympathique est là pour vous aider à chaque étape du processus d'achat.</p>
            </section>
            
            <section className="section">
                <h2 className="section-heading">Nous Contacter</h2>
                <p className="paragraph">Merci de visiter notre site et nous avons hâte de vous aider à trouver la voiture parfaite!</p>
            </section>
            
            
        </div>
    );
}

export default AboutPage;
