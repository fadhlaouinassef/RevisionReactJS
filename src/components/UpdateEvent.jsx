import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { Button, Container, Form } from 'react-bootstrap';
import { editEvent, getallEvents } from '../service/api';
import useEventStore from '../ZustandStores/useEventStore';

const eventSchema = z.object({
    name: z.string().min(3,"min 3 caractères!!"),
    description: z.string().min(10,"min 10"),
    img: z.string().optional()
});

export default function UpdateEvent() {
     const updateEventObject = useEventStore((state)=>state.updateEventObject);
     const {id} = useParams();
     const navigate = useNavigate();
     const {register, handleSubmit, reset, formState:{errors}} = useForm({
            resolver:zodResolver(eventSchema),
            defaultValues:{
                price:0,
                nbTickets:0
            }
        })
        useEffect(()=>{
            const fetchEvent = async () => {
                const response = await getallEvents(id);
                reset(response.data);
                //console.log(response.data);
            }
            fetchEvent()
        },[])

    const onSubmit = async (data) => {
            const response = editEvent(id,data);
            updateEventObject(id,response.data);
            navigate('/events'); 
        }
  return (
       <Container className='mt-5'>

        <h1>Update Event</h1>

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
                <Form.Label>         Image Filename      </Form.Label>
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

            <Button variant='primary' type='submit'>Update Event</Button>

        </Form>       
    </Container>
  )
}
