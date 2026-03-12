import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { editQuiz, getAllQuizzes } from "../service/quiz";

const QuizUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            questions: [{ question: "", answer: "" }],
        },
    });

    // useFieldArray gère la liste dynamique de questions
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    });

    // Chargement des données existantes du quiz
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await getAllQuizzes(id);
                reset(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement du quiz :", error);
            }
        };
        if (id) fetchQuiz();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            const quiz = {
                title: data.title,
                description: data.description,
                questions: data.questions,
            };
            await editQuiz(id, quiz);

            setSuccessMessage(`Le quiz "${quiz.title}" a été mis à jour.`);
            setTimeout(() => {
                navigate("/quizzes");
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du quiz :", error);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "700px" }}>
            <h2>Modifier le Quiz</h2>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Titre */}
                <Form.Group className="mb-3">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("title", { required: "Le titre est requis" })}
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        {...register("description", { required: "La description est requise" })}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Liste de questions */}
                <h5 className="mt-4">Questions</h5>
                {fields.map((field, index) => (
                    <div key={field.id} className="border rounded p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong>Question {index + 1}</strong>
                            {fields.length > 1 && (
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => remove(index)}
                                >
                                    Supprimer
                                </Button>
                            )}
                        </div>

                        <Form.Group className="mb-2">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                {...register(`questions.${index}.question`, {
                                    required: "La question est requise",
                                })}
                                isInvalid={!!errors.questions?.[index]?.question}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.questions?.[index]?.question?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Réponse</Form.Label>
                            <Form.Control
                                type="text"
                                {...register(`questions.${index}.answer`, {
                                    required: "La réponse est requise",
                                })}
                                isInvalid={!!errors.questions?.[index]?.answer}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.questions?.[index]?.answer?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                ))}

                <Button
                    variant="outline-primary"
                    className="mb-4"
                    onClick={() => append({ question: "", answer: "" })}
                >
                    + Ajouter une question
                </Button>

                <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                        Valider
                    </Button>
                    <Button variant="secondary" onClick={() => navigate("/quizzes")}>
                        Annuler
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default QuizUpdate;
