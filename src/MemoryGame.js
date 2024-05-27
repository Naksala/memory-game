import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const symbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍒', '🍓', '🥑'];

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    // Function to initialize cards
    const initializeCards = () => {
        const initialCards = symbols.concat(symbols).sort(() => Math.random() - 0.5);
        setCards(initialCards);
    };

    // Function to start the timer
    const startTimer = () => {
        setTime(0);
        setTimerOn(true);
    };

    // Function to stop the timer
    const stopTimer = () => {
        setTimerOn(false);
    };

    // Function to handle card click
    const handleCardClick = (index) => {
        if (selectedCards.length === 2 || matchedCards.includes(index)) return;

        const newSelectedCards = [...selectedCards, index];
        setSelectedCards(newSelectedCards);

        if (newSelectedCards.length === 2) {
            setMoves(moves + 1);

            if (cards[newSelectedCards[0]] === cards[newSelectedCards[1]]) {
                setMatchedCards([...matchedCards, ...newSelectedCards]);
                setSelectedCards([]);

                // Check if all cards are matched
                if (matchedCards.length + 2 === cards.length) {
                    stopTimer();
                    alert(`Congratulations! You won in ${moves + 1} moves and ${time} seconds.`);
                }
            } else {
                setTimeout(() => {
                    setSelectedCards([]);
                }, 1000);
            }
        }
    };

    // Function to handle restart button click
    const handleRestartClick = () => {
        initializeCards();
        setSelectedCards([]);
        setMatchedCards([]);
        setMoves(0);
        stopTimer();
        startTimer(); // Start timer again
    };

    // Update time every second
    useEffect(() => {
        let interval;
        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerOn]);

    // Initialize cards when component mounts
    useEffect(() => {
        initializeCards();
        startTimer(); // Start the timer when the component mounts
    }, []);

    return (
        <div className="memory-game">
            <h1>Memory Game</h1>
            <div className="board">
                {cards.map((symbol, index) => (
                    <div
                        key={index}
                        className={`card ${selectedCards.includes(index) ? 'selected' : ''} ${matchedCards.includes(index) ? 'matched' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        {matchedCards.includes(index) || selectedCards.includes(index) ? symbol : '❓'}
                    </div>
                ))}
            </div>
            <div className="stats">
                <p>Moves: {moves}</p>
                <p>Time: {time} seconds</p>
                <button onClick={handleRestartClick}>Restart</button>
            </div>
        </div>
    );
};

export default MemoryGame;
