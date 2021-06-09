import React, { useState } from "react";
import { Popover, OverlayTrigger } from "@themesberg/react-bootstrap";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faLink,
  faToggleOff,
  faToggleOn,
  faTrashAlt,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import {
  InputGroup,
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
  Form,
  Modal,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import { ToastContainer, toast } from "react-toastify";
import ModificationQuestion from "../Bib_question/Modification_Question";
import ViewQuestion from "../Bib_question/ViewQuestion";
import CreationEnquete from "../Enquete/CreationEnquete";
import ModificationEnquete from "../Enquete/ModificationEnquete";
import ViewEnquete from "../Enquete/ViewEnquete";
import MyVerticallyCenteredModal from "../Enquete/ModalLink";
import { getAllQuestions, getAllEnquete } from "../Services/listingServices";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../Constantes/DefaultValue";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";





export function TableRowEnquete (props) {
    const [Modify, setModify] = useState(false);
  const handleClose = () => setModify(false);
  const [showDefault1, setShowDefault1] = useState(false);
  const [ModalisOpen, setModalisOpen] = useState(false);
  const handleClose1 = () => setShowDefault1(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [ClickedEnquete, setClickedEnquete] = useState([]);
  const [enquetes, setEnquete] = useState([]);
  const [ModalLink, setModalLink] = useState(false);
  const [Linkk, setLinkk] = useState();
    const { id, titre, etat } = props.enquete;
    const statusVariant = etat === "Actif" ? "success" : "danger";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{titre}</span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>{etat}</span>
        </td>

        <td>
          {" "}
          <span className="fw-normal">5</span>
        </td>
        <ToastContainer />
        <Modal
          as={Modal.Dialog}
          centered
          show={Modify}
          onHide={handleClose}
        >
          <Modal.Header>
            <Modal.Title className="h6">Modifier une enquête </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>
          <ModificationEnquete enquete={props.enquete} />
        </Modal>
        <Modal
          as={Modal.Dialog}
          centered
          show={ModalLink}
          onHide={() => {
            setModalLink(false);
          }}
        >
          <Modal.Body style={{}}>
            <h2>Lien d'enquete</h2>
            <p>{Linkk}</p>
            <QRCode
              value={"www.facebiik.com"}
              size={100}
              level={"L"}
              style={{
                width: 500,
                height: 500,
              }}
            />
          </Modal.Body>
        </Modal>

        <Modal
          as={Modal.Dialog}
          centered
          show={showDefault1}
          onHide={handleClose1}
        >
          <Modal.Header>
            <Modal.Title className="h6">Visualiser une enquête </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose1} />
          </Modal.Header>
          <ViewEnquete enquete={props.enquete} />
        </Modal>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowDefault1(true)}>
                <FontAwesomeIcon icon={faEye} className="me-2" />
                Visualiser
              </Dropdown.Item>
              {etat == "Brouillon" && (
                <Dropdown.Item onClick={() => setModify(true)}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="me-2"
                    style={{ color: "orange" }}
                  />{" "}
                  Modifier
                </Dropdown.Item>
              )}
              {etat == "Actif" && (
                <Dropdown.Item
                  onClick={() => {
                    var data = JSON.stringify({
                      idEnquete: props.enquete.id,
                    });

                    var config = {
                      method: "post",
                      url: "http://localhost:5000/link/create",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      data: data,
                    };

                    axios(config)
                      .then(function (response) {
                        setLinkk(
                          `http://192.168.100.116:5000/link/${response.data.data.url}`
                        );
                        setModalLink(true);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLink}
                    className="me-2"
                    style={{ color: "grey" }}
                  />
                  Générer lien
                </Dropdown.Item>
              )}
              <Dropdown.Item
                className="text-danger"
                onClick={() => {
                  axios
                    .delete(baseURL + "enquete/delete/" + props.enquete.id)
                    .then((res) =>
                      toast.success("Enquete supprimée avec succès ")
                    );
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Supprimer
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };