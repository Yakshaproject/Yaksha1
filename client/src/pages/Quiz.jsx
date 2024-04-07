import React, { useState } from 'react';
import * as StellarSdk from "@stellar/stellar-sdk";


console.log("step 1", StellarSdk);
const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(['', '', '']);
    const [publicKey, setPublicKey] = useState('');
    const [userKeypair] = useState(StellarSdk.Keypair.random()); // For demo purposes, a new keypair is generated on each load

    const questions = [
        { label: "Question 1: What is 2+2? A) 3 B) 4 C) 5", name: "question1" },
        { label: "Question 2: What is the capital of France? A) London B) Paris C) Rome", name: "question2" },
        { label: "Question 3: What is the color of the sky? A) Red B) Blue C) Green", name: "question3" }
    ];

    const handleInputChange = (event) => {
        const { value } = event.target;
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = value;
        setAnswers(updatedAnswers);
    };

    const handlePublicKeyChange = (event) => {
        setPublicKey(event.target.value);
    };

    const handleSubmit = async (event) => {
        console.log(JSON.stringify({ answers, userPublicKey: publicKey }))
        event.preventDefault();
        // Submit answers to the backend
        try {
            const response = await fetch('http://localhost:8000/api/submit-quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answers, userPublicKey: publicKey })
            });
            const data = await response.json();
            if (data.success) {
                alert('Congratulations! You have won tokens!');
            } else {
                alert('Sorry, your answers are not correct.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Quiz</h1>
            {questions.map((question, index) => (
                currentQuestionIndex === index && (
                    <div key={question.name}>
                        <label>{question.label}</label>
                        <input type="text" name={question.name} onChange={handleInputChange} value={answers[currentQuestionIndex] || ''} />
                        {index < questions.length - 1 && (
                            <button type="button" onClick={handleNextQuestion}>Next</button>
                        )}
                    </div>
                )
            ))}
            {currentQuestionIndex === questions.length - 1 && (
                <div>
                    <label>Enter your Stellar Public Key:</label>
                    <input type="text" value={publicKey} onChange={handlePublicKeyChange} />
                    <button type="submit">Submit Answers</button>
                </div>
            )}
        </form>
    );
};

export default Quiz;