import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPaperclip,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { createQuestion } from "../Services/postingServices";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useHistory } from "react-router-dom";
export const ModificationQuestion = (props) => {
  const [Responses, setResponses] = useState([]);
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const [question, setquestion] = useState(props.question1);
  const [Response, setResponse] = useState([]);
  let username = props.question1.creator;
  let History = useHistory ();
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
       <ToastContainer />
      <Card.Body>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
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
                  value={question.entitled}
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
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Intitulé réponse</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Intitulé réponse"
                  value={question}
                  onChange={(e) => {
                    setquestion({
                      ...question,
                      entitled_response: e.target.value,
                    });
                  }}
                  value={question.entitled_response}
                />
                {question.entitled_response == "" && question.btnClicked && (
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
                <Form.Control
                  required
                  type="text"
                  value={username}
                  as={"input"}
                />
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
                      statut: e.target.value === "0" ? "Actif" : "Inactif",
                    });
                  }}
                  value={question.statut === "Actif" ? "0" : "1"}
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
                    checked={question.type === "Question provocante"}
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
                    checked={question.type === "Question alternative"}
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
                    checked={question.type === "Question motivante"}
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
                    checked={question.type === "Question suggestive"}
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
                  value={question.theme}
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
                  setquestion({
                    ...question,
                    responses: [...question.responses, ""],
                  });
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Ajouter une réponse
              </Button>
            </Col>
            {question.responses.map((res, i) => (
              <Row>
                <Col md={10} className="mb-3">
                  <Form.Group id="creator">
                    <Form.Label>Reponse {i + 1}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) => {
                        let r = question.responses;
                        r[i] = { reponse: e.target.value };
                        setquestion({
                          ...question,
                          responses: r,
                        });
                      }}
                      value={res.reponse}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    variant="link"
                    className="text-gray ms-auto"
                    onClick={() => {
                      console.log(res);
                      axios
                        .delete(
                          `http://localhost:5000/responses/delete/${res.id_response}`
                        )
                        .then((res) => {
                          let r = question.responses;
                          r.splice(i, 1);
                          setquestion({
                            ...question,
                            responses: r,
                          });
                        });

                      let r = question.responses;
                      r.splice(i, 1);
                      setquestion({
                        ...question,
                        responses: r,
                      });
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ alignContent: "left" }}
                    />
                  </Button>
                </Col>
              </Row>
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

                axios
                  .put(
                    `http://localhost:5000/questions/update/${question.id}`,
                    question
                  )
                  .then((res) => {
                    const ResponseArray = question.responses;
                    console.log(ResponseArray);
                    if (ResponseArray.length == 0) {
                    } else
                      ResponseArray.map((response) => {
                        axios
                          .post("http://localhost:5000/responses/create", {
                            reponse: response.reponse,
                            questionId: question.id,
                          })
                          .then((res) => {});
                      });
                  });
                  toast.success("Question modifiée avec succès "); 
                  window.location.reload()
              }}
            >
              Modifier
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
export default ModificationQuestion;
