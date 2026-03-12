import React, { useEffect, useState } from 'react'
import Event from './Event'
import { Alert, Col, Row, Container } from 'react-bootstrap';
//import eventsJson from '../data/events.json';
//import { getallEvents } from '../service/api'; 
import useEventStore from '../ZustandStores/useEventStore';

export default function EventList() {
    const {events, fetchEvents} = useEventStore();
    //const [events,setEvents] = useState([]);
    const [isShowBuyAlert, setIsShowBuyAlert] = useState(false);
    const [isShowWelcome, setIsShowWelcome] = useState(true);

    const showBuyAlert = () => {
        setIsShowBuyAlert(true)
        setTimeout(() => {
            setIsShowBuyAlert(false)
        }, 2000)
    }

    useEffect(() => {
        /*const fetchEvents= async () =>{
            // const response = await getallEvents();
            // console.log(response.data);
            const { data } = await getallEvents();
            //console.log(data);
            setEvents(data);
        }

        fetchEvents();*/

        fetchEvents();

        setTimeout(()=>{
            setIsShowWelcome(false);
        }, 3000)
    }, [])

  return (
    <Container>
        { isShowWelcome && (
            <Alert variant="info">
                Welcome to our Event Store!
            </Alert>
        )
        }
        <Row>
            {
                events.map((evItem, index) => {
                    return (
                        <Col key={`col-${index}`} md={4} className="mb-4">
                            <Event 
                                key={`event-${index}`}
                                event={evItem}
                                showBuyAlert={showBuyAlert}
                            />
                        </Col>
                    )
                })   
            }
        </Row>

        {
            isShowBuyAlert && (
            <Alert variant="success" className="mt-3">
                You have booked an event
            </Alert>
            )   
        }
    </Container>

  )
}
