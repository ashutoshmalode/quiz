import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const QuizHistory = ({ quizHistory }) => {
  const navigate = useNavigate();
  console.log("quizHistory >>>", quizHistory.slice(-15));
  return (
    <div>
      <dev>
        <h1>Quiz History</h1>
        <p>(There are last 15 results only.)</p>
      </dev>

      <ListGroup>
        {quizHistory.slice(-15).map((history, index) => (
          <>
            <ListGroup.Item key={index}>
              Quiz - {history.quizId}: {history.score}/{history.total}
            </ListGroup.Item>
          </>
        ))}
        <div>
          <Button
            className="my-2 btn btn-success"
            onClick={() => navigate("/")}
          >
            Back to Quizzes
          </Button>
        </div>
      </ListGroup>
    </div>
  );
};

export default QuizHistory;
