import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizList from "./QuizList";
import Quiz from "./Quiz";
import QuizHistory from "./QuizHistory";
import "bootstrap/dist/css/bootstrap.min.css";
import { openDB } from "idb";

const dbPromise = openDB("quiz-store", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("quiz-history")) {
      db.createObjectStore("quiz-history", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  },
});

async function addHistory(history) {
  const db = await dbPromise;
  await db.add("quiz-history", history);
}

async function getHistory() {
  const db = await dbPromise;
  return await db.getAll("quiz-history");
}

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const sampleQuizzes = [
      {
        id: 1,
        title: "Multiple-Choice Questions (5 Questions)",
        questions: [
          {
            id: 1,
            question: "Which planet is closest to the Sun?",
            options: ["Venus", "Mercury", "Earth", "Mars"],
            answer: "Mercury",
          },
          {
            id: 2,
            question:
              "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: "Queue",
          },
          {
            id: 3,
            question:
              "Which of the following is primarily used for structuring web pages?",
            options: ["Python", "Java", "HTML", "C++"],
            answer: "HTML",
          },
          {
            id: 4,
            question: "Which chemical symbol stands for Gold?",
            options: ["Au", "Gd", "Ag", "Pt"],
            answer: "Au",
          },
          {
            id: 5,
            question:
              "Which of these processes is not typically involved in refining petroleum?",
            options: [
              "Fractional distillation",
              "Cracking",
              "Polymerization",
              "Filtration",
            ],
            answer: "Filtration",
          },
        ],
      },
      {
        id: 2,
        title: "Integer-Type Questions - (5 Questions)",
        questions: [
          {
            id: 1,
            question: "What is the value of 12 + 28?",
            options: ["40", "45", "38", "34"],
            answer: "40",
          },
          {
            id: 2,
            question: "How many states are there in the United States?",
            options: ["58", "54", "50", "59"],
            answer: "50",
          },
          {
            id: 3,
            question:
              "In which year was the Declaration of Independence signed?",
            options: ["1779", "1758", "1772", "1776"],
            answer: "1776",
          },
          {
            id: 4,
            question: "What is the value of pi rounded to the nearest integer?",
            options: ["2", "3", "1", "4"],
            answer: "3",
          },
          {
            id: 5,
            question:
              "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
            options: ["120", "130", "125", "115"],
            answer: "120",
          },
        ],
      },
    ];
    setQuizzes(sampleQuizzes);

    getHistory().then((history) => setQuizHistory(history));
  }, []);

  const addQuizHistory = (history) => {
    setQuizHistory([...quizHistory, history]);
    addHistory(history);
  };

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<QuizList quizzes={quizzes} />} />
          <Route
            path="/quiz/:id"
            element={<Quiz quizzes={quizzes} addQuizHistory={addQuizHistory} />}
          />
          <Route
            path="/history"
            element={<QuizHistory quizHistory={quizHistory} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
