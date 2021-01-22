import React, { useState, useEffect} from 'react';
import './index.css';

// icons
import { FaBorderStyle, FaQuoteLeft } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaTumblr } from 'react-icons/fa';


const url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];


function App() {

  const [quoteText, setQuoteText] = useState("Deep quote here");
  const [authorText, setAuthorText] = useState("author name here");
  const [randomColor, setRandomColor] = useState("#1B9CFC");


  // get & set quote
  const getQuote = () => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
    let quotes = data.quotes;
    let length = data.quotes.length;
    let randomNumber = Math.floor(Math.random() * length);

    let randomQuote = quotes[randomNumber].quote;
    let randomQuoteAuthor = quotes[randomNumber].author;
  
    // set quote & author state
    setQuoteText(randomQuote);
    setAuthorText(randomQuoteAuthor);
    });
  }


  const changeColor = () => {
    let length = colors.length;
    let randomNumber = Math.floor(Math.random() * length);
    let randomColor = colors[randomNumber];

    // set random color
    setRandomColor(randomColor);
    let body = document.querySelector("body");
    body.style.backgroundColor = randomColor;
  }


// Initial quote & color
  useEffect(() => {
    getQuote();
    changeColor();
  }, []);


// function to change the quote & color
  const changeStuff = () => {
    getQuote();
    changeColor();
  }



  return (
    <>
      <article className="card">
        <div className="card__inner">
          <section className="quote-info">
            <h1 className="quote">
              <FaQuoteLeft className="quote-icon" style={{color:`${randomColor}`}}/>
              <p className="quote-text" style={{color:`${randomColor}`}}>{quoteText}</p>
            </h1>
            <h2 className="quote-author" style={{color:`${randomColor}`}}>
              {`- ${authorText}`}
            </h2>
          </section>

          <section className="quote-buttons">
            <button className="quote-button twitter-btn" style={{backgroundColor:`${randomColor}`}}>
              <FaTwitter className="icon icon-twitter"/>
            </button>
            <button className="quote-button tumblr-btn" style={{backgroundColor:`${randomColor}`}}>
            <FaTumblr className="icon icon-tumblr"/>
            </button>
            <button className="quote-button new-quote-btn"style={{backgroundColor:`${randomColor}`}}  onClick={() => changeStuff()}>
              New quote
            </button>
          </section>
        </div>
      </article>
    </>
  );
}

export default App;