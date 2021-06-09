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




export  function TableRowQuestion (props)  {
    const [showDefault, setShowDefault] = useState(false);
    const handleClose = () => setShowDefault(false);
    const Close = () => window.location.reload();
    const [showDefault1, setShowDefault1] = useState(false);
    const handleClose1 = () => setShowDefault1(false);
    let History = useHistory();
    const {
      id,
      entitled,
      creator,
      entitled_response,
      statut,
      responses,
      theme,
      type,
    } = props.question;
    const [SelectedQues, setSelectedQues] = useState();
    const statusVariant = statut === "Actif" ? "success" : "danger";
    const updateFieldChanged = (index, state) => {
      let q = props.question;
      q = {
        ...q,
        statut: statut == "Inactif" ? "Actif" : "Inactif",
      };
      axios.put(baseURL + "questions/update/" + id, q).then((res) => {
        toast.success("Question activée avec succès ");
        window.location.reload();
      });
     
    };
    const updateFieldChangedInactive = (index, state) => {
      let q = props.question;
      q = {
        ...q,
        statut: statut == "Inactif" ? "Actif" : "Inactif",
      };
      axios.put(baseURL + "questions/update/" + id, q).then((res) => {
        toast.success("Question désactivée avec succès ");
        window.location.reload();
      });
      
    };
  
    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {entitled}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{entitled_response}</span>
        </td>
        <td>
          <span className="fw-normal">{theme}</span>
        </td>
        <td>
          <span className="fw-normal">{type}</span>
        </td>
        <td>
          <span className="fw-normal">{responses.length}</span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>{statut}</span>
        </td>
        <Modal
          as={Modal.Dialog}
          centered
        show={showDefault}
          onHide={handleClose}
        >
          <Modal.Header>
            <Modal.Title className="h6">Modifier une question </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>
          <ModificationQuestion
           SingleQuestion={{ id,
            entitled,
            creator,
            entitled_response,
            statut,
            responses,
            theme,
            type}}
           
          />
        </Modal>
        <Modal
          centered
          show={showDefault1}
          onHide={handleClose1}
        >
          <Modal.Header>
            <Modal.Title className="h6">Visualiser une question </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose1} />
          </Modal.Header>
          <ViewQuestion
            question={{
              entitled,
              creator,
              entitled_response,
              statut,
              responses,
              theme,
              type,
              id,
            }}
          />
        </Modal>
        <ToastContainer />
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
              {statut == "Inactif" && (
                <div>
                  <OverlayTrigger
                    placement="left"
                    trigger="click"
                    overlay={
                      <Popover>
                        <Popover.Title>
                          {" "}
                          Confirmation de l'activation d’une question
                        </Popover.Title>
                        <Popover.Content>
                          Etes-vous sûr de vouloir activer la question "
                          {entitled} du thème {theme} ?
                        </Popover.Content>
                        <Button
                          onClick={() => {
                            updateFieldChanged();
                          }}
                        >
                          Activer
                        </Button>
                        <Button variant="white" onClick={Close}>
                          Annuler
                        </Button>
                      </Popover>
                    }
                  >
                    <Button variant="white">
                      <FontAwesomeIcon
                        icon={faToggleOn}
                        className="me-2"
                        style={{ color: "green" }}
                      />
                      Activer
                    </Button>
                  </OverlayTrigger>
                  <Dropdown.Item onClick={() => setShowDefault1(true)}>
                    <FontAwesomeIcon icon={faEye} className="me-2" />
                    Visualiser
                  </Dropdown.Item>
                </div>
              )}
              <div>
                {statut === "Actif" && (
                  <div>
                    <OverlayTrigger
                      placement="left"
                      trigger="click"
                      overlay={
                        <Popover>
                          <Popover.Title>
                            Confirmation de la désactivation d’une question
                          </Popover.Title>
                          <Popover.Content>
                            Etes-vous sûr de vouloir désactiver la question "
                            {entitled} " du thème {theme} ?
                          </Popover.Content>
                          <Button
                            onClick={() => {
                              updateFieldChangedInactive();
                            }}
                          >
                            Désactiver
                          </Button>
                          <Button variant="white" onClick={Close}>
                            Annuler
                          </Button>
                        </Popover>
                      }
                    >
                      <Button variant="white">
                        <FontAwesomeIcon
                          icon={faToggleOff}
                          className="me-2"
                          style={{ color: "red" }}
                        />
                        Désactiver
                      </Button>
                    </OverlayTrigger>

                    <Dropdown.Item
                      onClick={() => {
                        setShowDefault(true);
                        setSelectedQues(props.question);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="me-2"
                        style={{ color: "orange" }}
                      />{" "}
                      Modifier
                    </Dropdown.Item>
                  </div>
                )}
              </div>

              <Dropdown.Item
                className="text-danger"
                onClick={() => {
                  axios
                    .delete(baseURL + "questions/delete/" + props.question.id)
                    .then(
                      (res) => 
                      toast.success("Question supprimée avec succès "),
                      window.location.reload()
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







