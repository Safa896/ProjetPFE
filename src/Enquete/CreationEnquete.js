import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
  Table,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { AddQuesEnquete, createEnquete } from "../Services/postingServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useHistory } from "react-router-dom";

export const CreationEnquete = () => {
  let History = useHistory ();
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => window.location.reload();
  const [questionsByTheme, setQuestionsByTheme] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [enquete, setEnquete] = useState({
    titre: "",
    nbr_questions: "",
    etat: "",
    questions: [],
    btnClicked: false,
  });
  const fetchQuestionByTheme = (theme) => {
    console.log(theme)
    axios
      .get(`http://localhost:5000/questions/getbytheme/${theme}`)
      .then((res) => {
        console.log(res.data)
        setQuestionsByTheme(
          questionsByTheme.concat(res.data["data"]).reverse()
         
        );
      });
  };
  const handleSubmite = (e, sta) => {
    const enquetes = {
      titre: enquete.titre,
      nbr_questions: 5,
      etat: sta,
      questions: enquete.questions,
    };

    createEnquete(enquetes).then((res) => {
      enquete.questions.map((ques,i)=>{
        AddQuesEnquete(enquete.questions[i],res.data.data.id).then(res=>{
          
        })
       
      })
      toast.success("Enquête crée avec succés!");
      window.location.reload()
    });
  };
  return (
    <diV> <ToastContainer />
    <Card border="light" className="bg-white shadow-sm mb-4">
      
      <Card.Body>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="theme">
                <Form.Label>Thème</Form.Label>
                <Form.Select
                  defaultValue="0"
                  onChange={(e) => {
                    setSelectedTheme(e.target.value);

                    fetchQuestionByTheme(e.target.value);
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
            {selectedTheme !== "" && (
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
                                  if (e.target.checked){
                                    let q= enquete.questions
                                    q.push(question)
                                    setEnquete({
                                      ...enquete,
                                      questions:q,
                                    });
                                  }
                                   
                                }}
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
                      onChange={(e) => {
                        setEnquete({
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
                      setEnquete({ ...enquete, btnClicked: true });
                      handleSubmite(e, "Actif");
                    }}
                  >
                    Soumettre
                  </Button>
                  &nbsp;&nbsp; &nbsp;
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      setEnquete({ ...enquete, btnClicked: true });
                      handleSubmite(e, "Brouillon");
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
export default CreationEnquete;
