
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Image, Button, Container } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import background from "../../assets/img/illustrations/background.jpg";


export default () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} lg={5} className="order-2 order-lg-1 text-center text-lg-left">
              <h1 className="text-primary mt-5">
                Créer votre <span className="fw-bolder">questionnaire </span> en ligne
          </h1>
              <p className="lead my-4">
               Besoin de créer une enquête,un quiz facilement?Obtenez rapidement les réponses dont vous avez besoin
          </p>
              <Button as={Link} variant="primary" className="animate-hover" to={Routes.Transactions.path}>
                <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
               Créer votre questionnaire 
              </Button>
            </Col>
            <Col xs={12} lg={7} className="order-1 order-lg-2 text-center d-flex align-items-center justify-content-center">
              <Image src={background} className="img-fluid w-75"  roundedCircle/>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
