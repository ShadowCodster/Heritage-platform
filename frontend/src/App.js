import khajuraho1 from "./assets/images/khajuraho1.jpg";
import khajuraho2 from "./assets/images/khajuraho2.jpg";
import khajuraho3 from "./assets/images/khajuraho3.jpg";

import React, { useState } from "react";
import "./App.css";

const monuments = [
  {
    name: "Khajuraho Temples",
    checkpoints: [
      {
        title: "Entrance",
        fact: "Khajuraho temples are famous for their stunning sculptures.",
        image: khajuraho1,
      },
      {
        title: "Main Temple",
        fact: "Built between 950–1050 AD by the Chandela dynasty.",
        image: khajuraho2,
      },
      {
        title: "Final View",
        fact: "These temples are UNESCO World Heritage Sites.",
        image: khajuraho2,
      },
    ],
    motivation:
      "Heritage connects us to our roots. Keep exploring to uncover more history!",
    quiz: [
      {
        question: "Who built the Khajuraho temples?",
        options: ["Mughals", "Chandelas", "British", "Mauryas"],
        answer: "Chandelas",
      },
    ],
  },
];

function App() {
  const [step, setStep] = useState("login");
  const [name, setName] = useState("");
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [score, setScore] = useState(0);

  const monument = monuments[0];

  const nextCheckpoint = () => {
    if (currentCheckpoint < monument.checkpoints.length - 1) {
      setCurrentCheckpoint(currentCheckpoint + 1);
    } else {
      setStep("motivation");
    }
  };

  if (step === "login") {
    return (
      <div className="container">
        <h1>Heritage Explorer Login</h1>
        <input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => setStep("explore")}>Start Exploring</button>
      </div>
    );
  }

  if (step === "explore") {
    const cp = monument.checkpoints[currentCheckpoint];
    return (
      <div className="container">
        <h2>{monument.name}</h2>
        <img src={cp.image} alt={cp.title} />
        <h3>{cp.title}</h3>
        <p>🤖 AI Guide: {cp.fact}</p>
        <button onClick={nextCheckpoint}>Next Checkpoint</button>
      </div>
    );
  }

  if (step === "motivation") {
    return (
      <div className="container">
        <h2>🎉 Journey Complete!</h2>
        <p>{monument.motivation}</p>
        <button onClick={() => setStep("quiz")}>Take Quiz</button>
      </div>
    );
  }

  if (step === "quiz") {
    const q = monument.quiz[0];
    return (
      <div className="container">
        <h2>Quiz Time</h2>
        <p>{q.question}</p>
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              if (opt === q.answer) setScore(score + 10);
              setStep("result");
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (step === "result") {
    const saveScore = async () => {
      await fetch("http://localhost:5000/save-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score }),
      });
    };

    saveScore();

    return (
      <div className="container">
        <h2>Well Done, {name}!</h2>
        <p>Your Score: {score}</p>
        <p>Your progress has been saved 🎉</p>
      </div>
    );
  }


  return null;
}

export default App;
