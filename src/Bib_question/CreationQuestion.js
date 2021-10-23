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
import { addResponse, createQuestion } from "../Services/postingServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
export const CreationQuestion = () => {
  let History = useHistory();
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => window.location.reload();

  const [Response, setResponse] = useState([]);
  const [UserName, setUserName] = useState("");
  const [question, setquestion] = useState({
    entitled: "",
    type: "",
    theme: "",
    statut: "",
    creator: "",
    responses: [],
    btnClicked: false,
  });
  useEffect(
    function fetching() {
      const userData = JSON.parse(localStorage.getItem("User"));
      let user =
        userData["data"]["first_name"] + " " + userData["data"]["last_name"];
      setUserName(user);
      setquestion({
        ...question,
        creator: user,
      });
    },

    []
  );
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <ToastContainer />
      <Card.Body>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Intitulé</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Intitulé"
                  onChange={(e) => {
                    setquestion({
                      ...question,
                      entitled: e.target.value,
                    });
                  }}
                />
                {question.entitled == "" && question.btnClicked && (
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
            

            <div className="file-field">
              <div>
                <div className="d-flex">
                  <span className="icon icon-md">
                    <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                  </span>
                  <input type="file" />
                  <div className="d-md-block text-start">
                    <div className="fw-normal text-dark mb-1">
                      Choisir une image
                    </div>
                    <div className="text-gray small">
                      JPG, GIF or PNG. Taille max de 800K
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="creator">
                <Form.Label>Créateur</Form.Label>
                <Form.Control required type="text" value={UserName} />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="statut">
                <Form.Label>Statut</Form.Label>
                <Form.Select
                  defaultValue="0"
                  onChange={(e) => {
                    setquestion({
                      ...question,
                      statut: e.target.value == "0" ? "Actif" : "Inactif",
                    });
                  }}
                >
                  <option value="0">Actif</option>
                  <option value="1">Inactif</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Group as={Row} controlId="formHorizontalCheck">
                <Col sm={{ span: 11, offset: 0.5 }}>
                  <Form.Check
                    label="Question provocante"
                    onChange={(e) => {
                      if (e.target.checked)
                        setquestion({
                          ...question,
                          type: "Question provocante",
                        });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalCheck">
                <Col sm={{ span: 10, offset: 0.5 }}>
                  <Form.Check
                    label="Question alternative"
                    onChange={(e) => {
                      if (e.target.checked)
                        setquestion({
                          ...question,
                          type: "Question alternative",
                        });
                    }}
                  />
                </Col>
              </Form.Group>{" "}
              <Form.Group as={Row} controlId="formHorizontalCheck">
                <Col sm={{ span: 10, offset: 0.5 }}>
                  <Form.Check
                    label="Question motivante"
                    onChange={(e) => {
                      if (e.target.checked)
                        setquestion({
                          ...question,
                          type: "Question motivante",
                        });
                    }}
                  />
                </Col>
              </Form.Group>{" "}
              <Form.Group as={Row} controlId="formHorizontalCheck">
                <Col sm={{ span: 10, offset: 0.5 }}>
                  <Form.Check
                    label="Question ouverte"
                    onChange={(e) => {
                      if (e.target.checked)
                        setquestion({
                          ...question,
                          type: "Question ouverte",
                        });
                    }}
                  />
                </Col>
              </Form.Group>{" "}
              <Form.Group as={Row} controlId="formHorizontalCheck">
                <Col sm={{ span: 12, offset: 0.5 }}>
                  <Form.Check
                    label="Question sociodémographique"
                    onChange={(e) => {
                      if (e.target.checked)
                        setquestion({
                          ...question,
                          type: "Question sociodémographique",
                        });
                    }}
                  />
                </Col>
              </Form.Group>{" "}
              <Form.Group as={Row} controlId="formHorizontalCheck">
                <Col sm={{ span: 11, offset: 0.5 }}>
                  <Form.Check
                    label="Question suggestive"
                    onChange={(e) => {
                      if (e.target.checked)
                        setquestion({
                          ...question,
                          type: "Question suggestive",
                        });
                    }}
                  />
                </Col>
                {question.type == "" && question.btnClicked && (
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

            <Col md={6} className="mb-3">
              <Form.Group id="theme">
                <Form.Label>Thème</Form.Label>
                <Form.Select
                  defaultValue="0"
                  onChange={(e) => {
                    setquestion({
                      ...question,
                      theme: e.target.value,
                    });
                  }}
                >
                  <option value="Veuillez sélectionner">
                    Veuillez sélectionner
                  </option>
                  <option value="Café">Café</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Salle de sport">Salle de sport</option>
                  <option value="Hôtels">Hôtels</option>
                  <option value="Salle de cinéma">Salle de cinéma</option>
                </Form.Select>
                {question.theme == "" && question.btnClicked && (
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
            <Col md={6} className="mb-3">
              <Button
                variant="link"
                className="text-gray ms-auto"
                onClick={() => {
                  setResponse([...Response, ""]);
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Ajouter une réponse
              </Button>
            </Col>
            {Response.map((res, i) => (
              <Col md={12} className="mb-3">
                <Form.Group id="creator">
                  <Form.Label>Reponse {i + 1}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) => {
                      let resp = question.responses;
                      resp[i] = e.target.value;
                      setquestion({
                        ...question,
                        responses: resp,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>

          <div className="mt-3">
            <Button
              variant="primary"
              onClick={() => {
                setquestion({
                  ...question,
                  btnClicked: true,
                });
                if (
                  question.entitled !== "" &&
                  question.type !== "" &&
                  question.theme !== "" &&
                  question.statut !== ""
                ) {
                createQuestion(question)
                  .then((res) => {
                    question.responses.map(async (response) => {
                      console.log(response);
                      await axios.post(
                        "http://localhost:5000/responses/create",
                        {
                          reponse: response,
                          questionId: res.data.data.id,
                        }
                      );
                      toast.success("Question créée avec succès ");
                    window.location.reload();
                    });
                   
                  })

                  .catch((err) => console.log(err));
              }}
            }
            >
              Créer
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
export default CreationQuestion;
