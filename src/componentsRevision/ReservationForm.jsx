import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Form, Alert } from "react-bootstrap";
import { addReservation, editProperty, getallProperties } from '../service/properties';

const schema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    prenom: z.string().min(1, "Le prénom est requis"),
    locataireId: z.number({ invalid_type_error: "L'ID du locataire est requis" })
        .int("L'ID doit être un entier")
        .positive("L'ID doit être un nombre positif"),
    debut: z.string().min(1, "La date de début est requise"),
    fin: z.string().min(1, "La date de fin est requise"),
}).refine(data => data.fin > data.debut, {
    message: "La date de fin doit être après la date de début",
    path: ["fin"],
});

const ReservationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [property, setProperty] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const fetchProperty = async () => {
            const { data } = await getallProperties(id);
            setProperty(data);
        };
        fetchProperty();
    }, [id]);

    const onSubmit = async (data) => {
        const reservation = {
            propertyId: parseInt(id),
            locataireId: data.locataireId,
            debut: data.debut,
            fin: data.fin,
        };
        await addReservation(reservation);
        await editProperty(id, { available: false });

        const duree = Math.ceil(
            (new Date(data.fin) - new Date(data.debut)) / (1000 * 60 * 60 * 24)
        );
        const prixTotal = duree * property.price;

        setSuccessMessage(
            `${data.prenom} ${data.nom} votre réservation pour la propriété ${property.title} est confirmée pour un prix de ${prixTotal} DT.`
        );

        reset();
        setTimeout(() => {
            navigate('/properties');
        }, 5000);
    };

    return (
        <Container className='mt-5' style={{ maxWidth: '600px' }}>
            <h2>Formulaire de réservation</h2>
            <p className="text-muted">Propriété # {id}</p>

            {successMessage && (
                <Alert variant='success'>
                    {successMessage}
                </Alert>
            )}


            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3'>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ex : Ben Foulen'
                        {...register("nom")}
                        isInvalid={!!errors.nom}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.nom?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ex : Foulen'
                        {...register("prenom")}
                        isInvalid={!!errors.prenom}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.prenom?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>ID du locataire</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ex : 1'
                        {...register("locataireId", { valueAsNumber: true })}
                        isInvalid={!!errors.locataireId}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.locataireId?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Date de début</Form.Label>
                    <Form.Control
                        type='date'
                        {...register("debut")}
                        isInvalid={!!errors.debut}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.debut?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Date de fin</Form.Label>
                    <Form.Control
                        type='date'
                        {...register("fin")}
                        isInvalid={!!errors.fin}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.fin?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit'>Valider</Button>
                <Button variant='secondary' className='ms-2' onClick={() => navigate('/properties')}>
                    Annuler
                </Button>
            </Form>
        </Container>
    );
};

export default ReservationForm;