import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteEvent } from '../service/api'
import useEventStore from '../ZustandStores/useEventStore'

export default function Event({event, showBuyAlert}) {
    const deleteEventObject = useEventStore((state)=>state.deleteEventObject);
    const [eventInfo, setEventInfo] = useState(event)

    const handleBuy = () => {
        setEventInfo({
            ...eventInfo,
            nbTickets: eventInfo.nbTickets - 1,
            nbParticipants: eventInfo.nbParticipants + 1
        })

        showBuyAlert()
    }

    const handleLike = () => {
        setEventInfo({
            ...eventInfo,
            like: !eventInfo.like
        })
    }

    const handleDelete = async () => {
        await deleteEvent(eventInfo.id);
        deleteEventObject(eventInfo.id);
        //window.location.reload();
    }

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={`/images/${eventInfo.nbTickets === 0 ? "sold_out.png" : eventInfo.img}`} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>
                    <Link to={`/events/${eventInfo.name}`}>
                        {eventInfo.name}
                    </Link>
                </Card.Title>
                <Card.Text> Price : {eventInfo.price} </Card.Text>
                <Card.Text> Number of Tickets :  {eventInfo.nbTickets} </Card.Text>
                <Card.Text> Number of Participants : {eventInfo.nbParticipants}</Card.Text>
            
                <Button onClick={handleLike}>
                    {eventInfo.like ? "Dislike" : "Like"}
                </Button>

                <Button onClick={handleBuy} disabled={eventInfo.nbTickets === 0 ? true : false}>
                    Book an event
                </Button>
                <Button as={Link} to={`/events/update/${eventInfo.id}`}>
                    Update
                </Button>
                <Button onClick={handleDelete}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    )
}
