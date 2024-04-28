import React, { useState } from 'react';
import BobaBlitz from '/bobablitz.png';
import WhatsIt from '/whatsit.png';
import Login from '/loginscreen.png';
import CC from '/culturecorner.png';
import Game from '/game.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './App.css';

const Portfolio = () => {
    // separate states for dialectable carousel and other images
    const [dCaption, setdCaption] = useState('');
    const [otherCaption, setotherCaption] = useState('');
    const [dialectableIndex, setDialectableIndex] = useState(0);
    const [otherIndex, setOtherIndex] = useState(0);

    const dialectableImages = [
        { key: 1, name: Login, caption: 'Login screen for app. Involves local storage of username and password.' },
        { key: 2, name: CC, caption: 'Blog tab containing articles that highlight cultural significance of Nweh in Bangwa culture.' },
        { key: 3, name: Game, caption: 'Minigame for greetings that introduces users to basic Nweh greetings with audio and translation supplements.' }
    ];

    const otherImages = [
        {
            key: 4, name: BobaBlitz, caption: 'This is my game made with HTML, CSS, and JavaScript in the Phaser3 framework.\n' +
                'Boba Blitz!\n' +
                '...a game for bubble tea addicts...\n' +
                'To simulate making boba the user catches fresh ingredients, different types of\n' +
                "tea and tapioca pearls in their cup. Avoid ingredients that don't make sense\n" +
                "to make a refreshing cup of tea."
        },
        {
            key: 5, name: WhatsIt, caption: "The purpose of my website is to promote crochet materals that can be" +
                "used to make keychains and decor to encourage social interaction" +
                "amongst children in different environments. The website will also" +
                "include patterns that will be provided for free with instructions on" +
                "how to make the items and information on the importance of childrens'" +
                "mental health. “WhatsIt” is short for “what's it called” and alludes" +
                "to the fact that the projects kids make can be used as a conversation starter."
        }
    ];
    // reveals captions for images based on index and whether they belong to the dialectable project
    function revealCaption(index, isDialectable) {
        if (isDialectable) {
            setDialectableIndex(index);
            dCaption !== dialectableImages[index].caption ? setdCaption(dialectableImages[index].caption) : setdCaption('');
        } else {
            setOtherIndex(index);
            otherCaption !== otherImages[index].caption ? setotherCaption(otherImages[index].caption) : setotherCaption('');
        }
    }

    // shows next image based on index
    function nextImage() {
        setDialectableIndex(dialectableIndex + 1);
    }
    // shows previous image based on index
    function prevImage() {
        setDialectableIndex(dialectableIndex - 1);
    }

    return (
        <>
            <h1 className="website-headers">Projects</h1>
            <h3>Click for more info!</h3>
            <ul className="container">
                <h3>BobaBlitz</h3>
                <div className="imagepair">
                    <img src={BobaBlitz} className="image" onClick={() => revealCaption(0, false)} />
                    <p>{otherIndex === 0 && otherCaption}</p>
                </div>
                <h3>WhatsIt</h3>
                <div className="imagepair">
                    <img src={WhatsIt} className="image" onClick={() => revealCaption(1, false)} />
                    <p>{otherIndex === 1 && otherCaption}</p>
                </div>
                <div>
                    <h3>Dialectable</h3>
                    <p>{dCaption}</p>
                    <div id="carousel">
                    {dialectableIndex > 0 && <FaArrowLeft className = "arrow" onClick={() => prevImage()} />}
                    <img src={dialectableImages[dialectableIndex].name} className="dialectableImage" onClick={() => revealCaption(dialectableIndex, true)} />
                    {dialectableIndex < 2 && <FaArrowRight className = "arrow" onClick={() => nextImage()} />}
                    </div>
                </div>
            </ul>
        </>
    );
}

export default Portfolio;
