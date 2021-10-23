import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faHome,
  faSearch,
  faPlus,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { createClient } from "../Services/postingServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
export const CreationClient = () => {
  let History = useHistory();
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => window.location.reload();
  const [client, setclient] = useState({
    nom:"",
    prenom:"",
    age:"",
    btnClicked: false,
  });
 
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <ToastContainer />
      <Card.Body>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nom"
                  onChange={(e) => {
                    setclient({
                      ...client,
                    nom: e.target.value,
                    });
                  }}
                />
                {client.nom == "" && client.btnClicked && (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Veuillez remplir ce champ{" "}
                  </span>
                )}
              </Form.Group>
            </Col>

        
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="creator">
                <Form.Label>Prénom</Form.Label>
                <Form.Control required type="text"   placeholder="Prénom"
                  onChange={(e) => {
                    setclient({
                      ...client,
                    prenom: e.target.value,
                    });
                  }}
                />
                {client.prenom == "" && client.btnClicked && (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Veuillez remplir ce champ{" "}
                  </span>
                )} 
              </Form.Group>
            </Col>

          
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="creator">
                <Form.Label>Age</Form.Label>
                <Form.Control required type="int"   placeholder="Age"
                  onChange={(e) => {
                    setclient({
                      ...client,
                    age: e.target.value,
                    });
                  }}
                />
                {client.age == "" && client.btnClicked && (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Veuillez remplir ce champ{" "}
                  </span>
                )} 
              </Form.Group>
            </Col>

          
          </Row>
        
          <div className="mt-3">
            <Button
              variant="primary"
              onClick={() => {
                setclient({
                  ...client,
                  btnClicked: true,
                });
                createClient(client)
                  .then((res) => {
                   console.log(client)
                   History.push("/quiz")
                
                  })

                  .catch((err) => console.log(err));
              }}
              
            >
             Suivant
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
export default CreationClient;
