import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge, Col, ListGroup } from "react-bootstrap";
import { deleteQuiz } from "../service/quiz";

const Quiz = ({ quiz }) => {
    const [showQuestions, setShowQuestions] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteQuiz(quiz.id);
        window.location.reload();
    };

    const handleUpdate = () => {
        navigate(`/quizzes/update/${quiz.id}`);
    };

    return (
        <Col md={6} lg={4} className="mb-4">
            <Card className="h-100">
                <Card.Body>
                    <Card.Title>{quiz.title}</Card.Title>
                    <Card.Text className="text-muted">{quiz.description}</Card.Text>
                    <Badge bg="info" className="mb-3">
                        {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}
                    </Badge>

                    <div className="mb-3">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => setShowQuestions(!showQuestions)}
                        >
                            {showQuestions ? "Masquer les questions" : "Voir les questions"}
                        </Button>
                    </div>

                    {showQuestions && (
                        <ListGroup variant="flush" className="mb-3">
                            {quiz.questions.map((q, index) => (
                                <ListGroup.Item key={index}>
                                    <strong>Q{index + 1} :</strong> {q.question}
                                    <br />
                                    <span className="text-success">
                                        <strong>R :</strong> {q.answer}
                                    </span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                    <div className="d-flex gap-2">
                        <Button variant="warning" onClick={handleUpdate}>
                            Modifier
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Supprimer
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Quiz;
