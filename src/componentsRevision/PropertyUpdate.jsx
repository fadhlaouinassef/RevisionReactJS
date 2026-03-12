import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Form, Alert } from "react-bootstrap";
import { editProperty, getallProperties } from '../service/properties';

const schema = z.object({
    title: z.string().min(1, "Le nom est requis"),
    address: z.string().min(1, "L'adresse est requise"),
    price: z.number("Le prix est requis")
        .int("Le prix doit être un entier")
        .positive("Le prix doit être un nombre positif"),
});

const PropertyUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await getallProperties(id);
                reset(response.data);
            } catch (error) {
                console.error("Error fetching property:", error);
            }
        };
        if (id) fetchProperty();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            const property = {
                title: data.title,
                address: data.address,
                price: data.price,
            };
            await editProperty(id, property);

            setSuccessMessage(`La propriété ${property.title} a été mise à jour.`);

            setTimeout(() => {
                navigate('/properties');
            }, 2000);
        } catch (error) {
            console.error("Error updating property:", error);
        }
    };

    return (
        <Container className='mt-5' style={{ maxWidth: '600px' }}>
            <h2>Modifier la propriété</h2>

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

export default PropertyUpdate;
