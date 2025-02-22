import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const QuizList = ({ quizzes }) => {
  return (
    <div>
      <h1 className="m-2" style={{ color: "red" }}>
        Quizzes
      </h1>
      <ListGroup>
        {quizzes.map((quiz) => (
          <ListGroup.Item
            className="d-flex justify-content-between"
            key={quiz.questions.id}
          >
            <h3>{quiz.title}</h3>
            <Link to={`/quiz/${quiz.id}`}>
              <Button className="btn btn-success btn-md" variant="primary">
                Start Quiz
              </Button>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default QuizList;
