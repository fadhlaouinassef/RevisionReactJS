import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { addQuiz } from "../service/quiz";

const QuizForm = () => {
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

    const onSubmit = async (data) => {
        const quiz = {
            title: data.title,
            description: data.description,
            questions: data.questions,
        };
        await addQuiz(quiz);

        setSuccessMessage(`Le quiz "${quiz.title}" a été ajouté avec succès.`);
        reset();
        setTimeout(() => {
            navigate("/quizzes");
        }, 2000);
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "700px" }}>
            <h2>Ajouter un Quiz</h2>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Titre */}
                <Form.Group className="mb-3">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex : Quiz sur React"
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
                        placeholder="Ex : Testez vos connaissances..."
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
                                placeholder="Ex : Qu'est-ce que React ?"
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
                                placeholder="Ex : Une bibliothèque JavaScript"
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

export default QuizForm;
