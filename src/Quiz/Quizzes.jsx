import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Button } from "react-bootstrap";
import Quiz from "./Quiz";
import { getAllQuizzes } from "../service/quiz";

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            const { data } = await getAllQuizzes();
            setQuizzes(data);
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Quizzes</h2>
                <Button variant="success" onClick={() => navigate("/quizzes/add")}>
                    Ajouter un Quiz
                </Button>
            </div>
            <Row>
                {quizzes.map((quiz) => (
                    <Quiz key={quiz.id} quiz={quiz} />
                ))}
            </Row>
        </div>
    );
};

export default Quizzes;
