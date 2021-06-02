import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup,Table } from '@themesberg/react-bootstrap';
import axios from "axios";


export const Configuration = () => {
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const [name, setName] = useState(false);
  const [phone, setPhone] = useState(false);
  const [age, setAge] = useState(false);
  const [prenom, setPrenom] = useState(false);
  const handleNameChange = e => setName(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);
const fetchPost=()=>{
  var data = JSON.stringify({
    "nom": name,
    "prenom": prenom,
    "age": age,
    "telephone": phone
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:5000/critere/create',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
 
  })
  .catch(function (error) {
    console.log(error);
  });
}

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
       
      <Form>
<Row>
<Col md={6} className="mb-3">
              <Form.Group as={Row} controlId="formHorizontalCheck">
    <Col sm={{ span: 10, offset: 0.5 }}>
      <Form.Check  onChange={()=>setName(!name)}label="Nom" />
    </Col>
    
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalCheck">
    <Col sm={{ span: 10, offset: 0.5 }}>
      <Form.Check label="Prénom"  onChange={()=>setPrenom(!prenom)} />
    </Col>
    
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalCheck">
    <Col sm={{ span: 10, offset: 0.5 }}>
      <Form.Check  onChange={()=>setAge(!age)}label="Age" />
    </Col>
    
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalCheck">
    <Col sm={{ span: 10, offset: 0.5 }}>
      <Form.Check onChange={()=>setPhone(!phone)} label="Téléphone" />
    </Col>
    
  </Form.Group>
 
  </Col>
</Row>
&nbsp;
<div className="mt-3">
  <Button variant="primary" type="submit" style ={{marginLeft:123}}  onClick={()=>fetchPost()}>
Soumettre
  </Button>
 

  <Button
    variant="link"
    className="text-gray ms-auto"
    onClick={handleClose}
  >
    Annuler
  </Button>
</div>
</Form>
      </Card.Body>
    </Card>
  );
};
export default Configuration;