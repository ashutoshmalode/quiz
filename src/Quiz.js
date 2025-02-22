import React, { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Quiz = ({ quizzes, addQuizHistory }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quiz = quizzes.find((q) => q.id === parseInt(id));

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  });

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
      addQuizHistory({
        quizId: quiz.id,
        score,
        total: quiz.questions.length,
      });
    }
  };

  return (
    <Card>
      <Card.Body>
        {!quizCompleted ? (
          <>
            <Card.Title>{quiz.title}</Card.Title>
            <Card.Text>{quiz.questions[currentQuestion].question}</Card.Text>
            <Form>
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  label={option}
                  name="quizOption"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
              ))}
            </Form>
            <Button
              className="my-2 btn btn-success"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              Next
            </Button>
            <div>Time Left: {timeLeft} seconds</div>
          </>
        ) : (
          <div className="my-2">
            <h2>Heyy Congratulations... Quiz Completed!</h2>
            <h4>
              Your Score is : {score}/{quiz.questions.length}
            </h4>
            <div>
              <Button
                className="m-2 btn btn-warning"
                onClick={() => navigate("/")}
              >
                Back to Quizzes
              </Button>
              <Button
                className="m-2 btn btn-danger"
                onClick={() => navigate("/history")}
              >
                Quiz History
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Quiz;
