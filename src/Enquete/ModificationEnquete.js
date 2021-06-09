import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
  Table,
} from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";

export const ModificationEnquete = (enquete) => {
  console.log(enquete["enquete"].id);
  let History = useHistory();
  const [theme, settheme] = useState("");
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const [selectedTheme, setSelectedTheme] = useState(enquete);
  const [questionsByTheme, setQuestionsByTheme] = useState([]);

  const [enqueteToChange, setEnqueteToChange] = useState({
    //theme: enquete.questions.theme,
    titre: enquete["enquete"].titre,
    etat: enquete["enquete"].etat,
    //  theme: enquete['enquete'].theme,
    question: enquete["enquete"].questions,
  });
  const fetchQuestionByTheme = (theme) => {
    axios
      .get(`http://localhost:5000/questions/getbytheme/${theme}`)
      .then((res) => {
        setQuestionsByTheme(res.data["data"]);
        res.data["data"][0]
          ? settheme(res.data["data"][0]?.theme)
          : settheme(theme);
      });
  };

  useEffect(function () {
    fetchQuestionByTheme(enquete.enquete.questions[0]?.theme);
  }, []);
  const handleReset = () => {
    window.location.replace("/admin/enquete");
  };
  const UpdateEnquete = (e, statut) => {
    const datapost = {
      titre: enqueteToChange.titre,
      // theme: enqueteToChange.theme,
      // nbr_questions: enqueteToChange.nbr_questions,
      etat: statut,
    };

    axios
      .put(`http://localhost:5000/enquete/update/${enquete["enquete"].id}`, datapost)
      .then((res) => {
        console.log(res.data);
        const QuestionArray = enqueteToChange.question;

        if (QuestionArray.length == 0) {
          
        } else {
          QuestionArray.map((question) => {
            axios
              .put(`http://localhost:5000/questions/update/${question.id}`, {
                theme: question.theme,
                enqueteId: enquete.id,
              })
              .then((res) => {
                console.log(res.data);
              });
          });
        }
        
      });
      toast.success("Enquête éditée avec succés!");
          window.location.reload();
  };

  return (
    <diV>
      {" "}
      <ToastContainer />
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="theme">
                  <Form.Label>Thème</Form.Label>
                  <Form.Select
                    defaultValue="0"
                    // value={selectedTheme}
                    value={"" + theme}
                    onChange={(e) => {
                      fetchQuestionByTheme(e.target.value);
                      settheme(e.target.value);
                    }}
                  >
                    <option value="0">Veuillez sélectionner</option>
                    <option value="Café">Café</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Salle de sport">Salle de sport</option>
                    <option value="Hôtels">Hôtels</option>
                    <option value="Salle de cinéma">Salle de cinéma</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {theme != "" && (
                <>
                  <Table>
                    <thead className="thead-light">
                      <tr>
                        <th className="border-0">#</th>
                        <th className="border-0">Question</th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {questionsByTheme.length == 5 ? (
                          questionsByTheme.map((question, i) => (
                            <tr hover key={i}>
                              <td>
                                {" "}
                                <Form.Check
                                  onChange={(e) => {
                                    if (e.target.checked)
                                      setEnqueteToChange({
                                        ...enquete,
                                        question: [
                                          ...enqueteToChange.question,
                                          question,
                                        ],
                                      });
                                  }}
                                  checked={enqueteToChange.question}
                                />
                              </td>
                              <td>{question["entitled"]}</td>
                            </tr>
                          ))
                        ) : (
                          <span style={{ color: "red" }}>
                            Nombre de questions insuffisant{" "}
                          </span>
                        )}
                      </>
                    </tbody>
                  </Table>

                  <Col md={12} className="mb-3">
                    <Form.Group id="title">
                      <Form.Label>Titre</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Titre"
                        value={enqueteToChange.titre}
                        onChange={(e) => {
                          setEnqueteToChange({
                            ...enquete,
                            titre: e.target.value,
                          });
                        }}
                      />
                      {enquete.titre == "" && enquete.btnClicked && (
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

                  <div className="mt-3">
                    <Button
                      variant="primary"
                      style={{ marginLeft: 89 }}
                      onClick={(e) => {
                        UpdateEnquete(e, "Actif");
                      }}
                    >
                      Modifier
                    </Button>
                    &nbsp;&nbsp; &nbsp;
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        UpdateEnquete(e, "Brouillon");
                      }}
                    >
                      Brouillon
                    </Button>
                    <Button
                      variant="link"
                      className="text-gray ms-auto"
                      onClick={handleClose}
                    >
                      Annuler
                    </Button>
                  </div>
                </>
              )}
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </diV>
  );
};
export default ModificationEnquete;
