import React, { useState } from 'react';
import BobaBlitz from '/bobablitz.png';
import WhatsIt from '/whatsit.png';
import Login from '/loginscreen.png';
import CC from '/culturecorner.png';
import Game from '/game.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './App.css';

const Portfolio = () => {
    const [bbCaption, setbbCaption] = useState('');
    const [whCaption, setwhCaption] = useState('');
    const [imageIndex, setImageIndex] = useState(0);

    const appImages = [
        { index: 1, name: Login },
        { index: 2, name: CC },
        { index: 3, name: Game },
        {
            index: 4, name: BobaBlitz, caption: 'This is my game made with HTML, CSS, and JavaScript in the Phaser3 framework.\n' +
                'Boba Blitz!\n' +
                '...a game for bubble tea addicts...\n' +
                'To simulate making boba the user catches fresh ingredients, different types of\n' +
                "tea and tapioca pearls in their cup. Avoid ingredients that don't make sense\n" +
                "to make a refreshing cup of tea.'"
        },
        {
            index: 5, name: WhatsIt, caption: "The purpose of my website is to promote crochet materals that can be" +
                "used to make keychains and decor to encourage social interaction" +
                "amongst children in different environments. The website will also" +
                "include patterns that will be provided for free with instructions on" +
                "how to make the items and information on the importance of childrens'" +
                "mental health. “WhatsIt” is short for “what's it called” and alludes" +
                "to the fact that the projects kids make can be used as a conversation starter."
        }
    ]
    function revealwhCaption() {
        whCaption === '' ? setwhCaption(appImages[4].caption) : setwhCaption('')
    }
    function revealbbCaption() {
        bbCaption === '' ? setbbCaption(appImages[3].caption) : setbbCaption('')
    }
    function nextImage() {
        setImageIndex(imageIndex + 1);
    }
    function prevImage() {
        setImageIndex(imageIndex - 1);
    }
    return (
        <>
            <h3>Click for more info!</h3>
            <ul className="container">
                <div className="imagepair">
                    <img src={BobaBlitz} className="image" onClick={revealbbCaption} />
                    <p>{bbCaption}</p>
                </div>
                <div className="imagepair">
                    <img src={WhatsIt} className="image" onClick={revealwhCaption} />
                    <p>{whCaption}</p>
                </div>
                <div>
                    <h3>Dialectable</h3>
                    {imageIndex > 0 && <FaArrowLeft onClick={() => prevImage()} />}
                    <img src={appImages[imageIndex].name} className="image" />
                    {imageIndex < 2 && <FaArrowRight onClick={() => nextImage()} />}
                </div>
            </ul>
        </>
    );
}

export default Portfolio;