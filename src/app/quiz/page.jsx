'use client'; // Add this if using the App Router

import React, { useState } from 'react';
import { quiz } from '../data'; // Adjust the path if needed

function QuizPage() {

    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    const { questions } = quiz;
    const { question, answers, correctAnswer } = questions[activeQuestion];

    const onAnswerSelected = (answer, index) => {
        setChecked(true);
        setSelectedAnswerIndex(index);

        if (answer === correctAnswer) {
            setSelectedAnswer(true);
        } else {
            setSelectedAnswer(false);
        }
    };

    const nextQuestion = () => {
        setSelectedAnswerIndex(null);
        setResult((prev) =>
            selectedAnswer
                ? {
                      ...prev,
                      score: prev.score + 5,
                      correctAnswers: prev.correctAnswers + 1,
                  }
                : {
                      ...prev,
                      wrongAnswers: prev.wrongAnswers + 1,
                  }
        );
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
        setChecked(false);
    };

    return (
        <div className="container">
            <h1>Quiz Page</h1>
            <div>
                <h2>
                    Question: {activeQuestion + 1} <span>/{questions.length}</span>
                </h2>
            </div>
            <div>
                {!showResult ? (
                    <div className="quiz-container">
                        <h3>{questions[activeQuestion].question}</h3>
                        {answers.map((answer, index) => (
                            <li
                                key={index}
                                className={
                                    selectedAnswerIndex === index
                                        ? 'li-selected'
                                        : 'li-hover'
                                }
                                onClick={() => {
                                    onAnswerSelected(answer, index);
                                }}
                            >
                                <span>{answer}</span>
                            </li>
                        ))}
                        {checked ? (
                            <button onClick={nextQuestion} className="btn">
                                {activeQuestion === questions.length - 1
                                    ? 'Finish'
                                    : 'Next'}
                            </button>
                        ) : (
                            <button disabled className="btn-disabled">
                                {activeQuestion === questions.length - 1
                                    ? 'Finish'
                                    : 'Next'}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="quiz-container">
                        <h3>Result</h3>
                        <h3>
                            Overall {((result.score / (questions.length * 5)) * 100).toFixed(2)}%
                        </h3>
                        <p>
                            Total Questions: <span>{questions.length}</span>
                        </p>
                        <p>
                            Total Score: <span>{result.score}</span>
                        </p>
                        <p>
                            Correct Answers: <span>{result.correctAnswers}</span>
                        </p>
                        <p>
                            Wrong Answers: <span>{result.wrongAnswers}</span>
                        </p>
                        <button onClick={() => window.location.reload()}>Restart</button>
                        
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizPage;
