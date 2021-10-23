import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faUsers,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { register } from "../../Services/ConnectionServices";

export default () => {
  let History = useHistory();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [first_name, setname] = useState();
  const [last_name, setLastName] = useState();
  const [signup, setsignup] = useState({
    email:"",
    password:"",
    first_name:"",
    last_name:"",
    btnClicked: false,
    
  });
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Créer un compte</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="name" className="mb-4">
                    <Form.Label>Nom</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUsers} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="text"
                        placeholder="Nom"
                        onChange={(e) => {
                          setname(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {signup.first_name == "" && signup.btnClicked && (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Veuillez remplir ce champ{" "}
                  </span>
                )}
                  </Form.Group>
                  <Form.Group id="lastname" className="mb-4">
                    <Form.Label>Prénom</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUsers} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Prénom"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {signup.last_name == "" && signup.btnClicked && (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Veuillez remplir ce champ{" "}
                  </span>
                )}
                  </Form.Group>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@gmail.com"
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {signup.email == "" && signup.btnClicked && (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Veuillez remplir ce champ{" "}
                  </span>
                )}
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Mot de passe</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Mot de passe"
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                      />
                    </InputGroup>
                    {signup.password == "" && signup.btnClicked && (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    Veuillez remplir ce champ{" "}
                  </span>
                )}
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="terms" className="me-2" />
                    <FormCheck.Label htmlFor="terms">
                      J'accepte les <Card.Link>termes et conditions</Card.Link>
                    </FormCheck.Label>
                  </FormCheck>

                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => {
                        setsignup({
                          ...signup,
                          btnClicked: true,
                        });
                      register(first_name, last_name, email, password)
                        .then((res) => {
                          localStorage.setItem(
                            "usertoken",
                            JSON.stringify(res.data)
                          );
                          localStorage.setItem(
                            "User",
                            JSON.stringify(res.data)
                          );
                          console.log(res);
                          History.push("/home");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Créer un compte
                  </Button>
                </Form>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Vous avez déjà un compte?
                    <Card.Link
                      as={Link}
                      to={Routes.Signin.path}
                      className="fw-bold"
                    >
                      {` Se connecter  `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
