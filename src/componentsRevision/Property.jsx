import { Alert, Button, Card, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProperty } from '../service/properties';

const Property = (props) => {
    const [vues, setVues] = useState(props.property.views);
    const navigate = useNavigate();

    const handleView = () => {
        setVues(vues + 1);
        navigate(`/reserve/${props.property.id}`);
    }

    const handleUpdate = () => {
        navigate(`/properties/update/${props.property.id}`);
    }

    const handleDelete = async () => {
        await deleteProperty(props.property.id);
        window.location.reload();
    }

    return (
        <Col md={4} sm={6} xs={12} className="mb-4">
            <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={`/images/${props.property.image}`} style={{ height: '200px', objectFit: 'cover' }} alt={props.property.image} />
                <Card.Body>
                    <Card.Title>{props.property.title}</Card.Title>
                    <Card.Text> Price :  {props.property.price} DT</Card.Text>
                    <Card.Text> Adresse :  {props.property.address}</Card.Text>
                    <Card.Text> Vues : {vues}</Card.Text>
                    <div className="d-flex flex-column gap-2">
                        {props.property.available &&
                            <Button variant="primary" onClick={handleView}>
                                Réserver
                            </Button>
                        }
                        <div className="d-flex gap-2">
                            <Button variant="warning" className="flex-fill" onClick={handleUpdate}>
                                Update
                            </Button>
                            <Button variant="danger" className="flex-fill" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Property;
