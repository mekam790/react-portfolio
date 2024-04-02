import React, { useState } from 'react';
import BobaBlitz from '/bobablitz.png';
import WhatsIt from '/whatsit.png'
import './App.css';

const Portfolio = () => {
    const [showCaption, setShowCaption] = useState(false);

    function Caption() {
        setShowCaption(!showCaption);
    }
    return (
        <>
            <h3>Click for more info!</h3>
            <ul className="container">
                <div className="imagepair">
                <img src={BobaBlitz} className="image" onClick={() => Caption()} />
                {showCaption && <p>This is my game made with HTML, CSS, and JavaScript in the Phaser3 framework.

                    Boba Blitz!

                    ...a game for bubble tea addicts...

                    To simulate making boba the user catches fresh ingredients, different types of
                    tea and tapioca pearls in their cup. Avoid ingredients that don't make sense
                    to make a refreshing cup of tea.</p>}
                </div>
                <div className="imagepair">
                <img src={WhatsIt} className="image" onClick={() => Caption()} />
                {showCaption && <p>The purpose of my website is to promote crochet materals that can be
                    used to make keychains and decor to encourage social interaction
                    amongst children in different environments. The website will also
                    include patterns that will be provided for free with instructions on
                    how to make the items and information on the importance of childrens'
                    mental health. “WhatsIt” is short for “what's it called” and alludes
                    to the fact that the projects kids make can be used as a conversation starter.</p>}
                </div>
            </ul>
        </>
    );
}

export default Portfolio;