import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { addEvent } from '../service/api'
import { useNavigate } from 'react-router-dom'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import useEventStore from '../ZustandStores/useEventStore'

const eventSchema = z.object({
    name: z.string().min(3,"3 caractères minimum!!"),
    description: z.string().min(10,"10 caractères minimum!!"),
    img: z.string().optional()
});

export default function AddEvent() {
    const navigate = useNavigate();
    const addEventObject = useEventStore((state)=>state.addEventObject);
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver:zodResolver(eventSchema),
        defaultValues:{
            price:0,
            nbTickets:0
        }
    })
    const onSubmit = async (data) => {
        console.log(data);
        const response = await addEvent(data);
        addEventObject(response.data);
        navigate('/events');

    }
  return (
    <Container className='mt-5'>

        <h1>Add New Event</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3'>
                <Form.Label>         Name       </Form.Label>
                    <Form.Control type='text' {...register("name")} isInvalid={!!errors.name}/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.name?.message}
                    </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>         Description      </Form.Label>
                    <Form.Control type='textarea' rows={3} {...register("description")} isInvalid={!!errors.description}/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.description?.message}
                    </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>         Image Filename   </Form.Label>
                    <Form.Control type='text' placeholder='e.g. event1.jpg' {...register("img")}/>
                    <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>         Price     </Form.Label>
                    <Form.Control type='number' {...register("price",{valueAsNumber:true})}/>
                    <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>         Number of tickets     </Form.Label>
                    <Form.Control type='number' {...register("nbTickets")}/>
                    <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>         Number of participants    </Form.Label>
                    <Form.Control type='number' {...register("nbParticipants")}/>
                    <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
            </Form.Group>

            <Button variant='primary' type='submit'>Add Event</Button>

        </Form>       
    </Container>
  )
}
