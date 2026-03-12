import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Form, Alert } from "react-bootstrap";
import { addProperty } from '../service/properties';

const schema = z.object({
    title: z.string().min(1, "Le nom est requis"),
    address: z.string().min(1, "L'adresse est requise"),
    price: z.number("Le prix est requis")
        .int("Le prix doit être un entier")
        .positive("Le prix doit être un nombre positif"),
});

const PropertyForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });


    const onSubmit = async (data) => {
        const property = {
            title: data.title,
            address: data.address,
            price: data.price,
        };
        await addProperty(property);

        setSuccessMessage(
            `${data.prenom} ${data.nom} votre réservation pour la propriété ${property.title} est confirmée pour un prix de ${property.price} DT.`
        );

        reset();
        setTimeout(() => {
            navigate('/properties');
        }, 5000);
    };

    return (
        <Container className='mt-5' style={{ maxWidth: '600px' }}>
            <h2>Formulaire de réservation</h2>
            <p className="text-muted">Propriété</p>

            {successMessage && (
                <Alert variant='success'>
                    {successMessage}
                </Alert>
            )}


            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3'>
                    <Form.Label>title</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ex : Ben Foulen'
                        {...register("title")}
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.title?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ex : Foulen'
                        {...register("address")}
                        isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.address?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ex : 1'
                        {...register("price", { valueAsNumber: true })}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.price?.message}
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

export default PropertyForm;