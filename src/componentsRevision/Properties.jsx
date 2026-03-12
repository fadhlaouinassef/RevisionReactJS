import { useState, useEffect } from "react";
import Property from "./Property";
import { getallProperties } from '../service/properties';
import { Alert, Col, Row, Container } from 'react-bootstrap';


const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [prixMin, setPrixMin] = useState();
  const [prixMax, setPrixMax] = useState();

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await getallProperties();
      console.log(response.data);
      const { data } = await getallProperties();
      console.log(data);
      setProperties(data);
    }
    fetchProperties();
  }, []);

  return (
    <div>
      <h2>Properties</h2>
      <p>This is the Properties component.</p>
      <div className="mb-3">
        <input type="number" placeholder="Prix minimum..." value={prixMin} onChange={(e) => setPrixMin(e.target.value)} />
        <input type="number" placeholder="prix maximum..." value={prixMax} onChange={(e) => setPrixMax(e.target.value)} />
      </div>
      <Row>
        {properties.filter(property =>
          (!prixMin || property.price >= prixMin) &&
          (!prixMax || property.price <= prixMax)
        ).map((property, index) => {
          return <Property key={index} property={property} />;
        })}
      </Row>
    </div>

  );
};

export default Properties;