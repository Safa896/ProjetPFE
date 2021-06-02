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
  Modal,
  Form,
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

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";
  let History = useHistory();

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon
            icon={bounceIcon}
            className={`${bounceTxtColor} me-3`}
          />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">
              See all
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map((pv) => (
            <TableRow key={`page-visit-${pv.id}`} {...pv} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const {
      id,
      source,
      sourceIcon,
      sourceIconColor,
      sourceType,
      category,
      rank,
      trafficShare,
      change,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {id}
          </Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon
            icon={sourceIcon}
            className={`icon icon-xs text-${sourceIconColor} w-30`}
          />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar
                variant="primary"
                className="progress-lg mb-0"
                now={trafficShare}
                min={0}
                max={100}
              />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map((pt) => (
              <TableRow key={`page-traffic-${pt.id}`} {...pt} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const {
      country,
      countryImage,
      overallRank,
      overallRankChange,
      travelRank,
      travelRankChange,
      widgetsRank,
      widgetsRankChange,
    } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image
              src={countryImage}
              className="image-small rounded-circle me-2"
            />
            <div>
              <span className="h6">{country}</span>
            </div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">{overallRank ? overallRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">{travelRank ? travelRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">{widgetsRank ? widgetsRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const Close = () => window.location.reload();
  const [showDefault1, setShowDefault1] = useState(false);
  const [ModalisOpen, setModalisOpen] = useState(false);
  const handleClose1 = () => setShowDefault1(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dataFilter, setDataFilter] = useState({
    entitled: "",
    statut: "",
    type: "",
    theme: "",
  });
  const [questions, setquestions] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    getAllQuestions().then((res) => {
      //console.log(res.data.data)
      setquestions([...questions, res.data.data.reverse()]);
    });
  }, []);
  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const search = (data) => {
    console.log(data);
    const filtredData = questions[0].filter((question) => {
      return (
        question.entitled.toUpperCase().includes(data.entitled.toUpperCase()) &&
        question.statut.toUpperCase().includes(data.statut.toUpperCase()) &&
        question.type.toUpperCase().includes(data.type.toUpperCase()) &&
        question.theme.toUpperCase().includes(data.theme.toUpperCase())
      );
    });
    console.log(filtredData);
    let q ={...questions[0]};
    q[0] = filtredData;
    setquestions(q);
  };
  const handleRefresh = () => {
    document.getElementById("entitled").value = "";
    document.getElementById("checkbox").checked = false;
    document.getElementById("checkbox1").checked = false;
    document.getElementById("checkbox2").checked = false;
    document.getElementById("checkbox3").checked = false;
    document.getElementById("theme").value = "";
    document.getElementById("statut").value = "";
  };
  const TableRow = (props) => {
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
            question1={{
              entitled,
              creator,
              entitled_response,
              statut,
              responses,
              theme,
              type,
              btnClicked: false,
              id,
            }}
          />
        </Modal>
        <Modal
          as={Modal.Dialog}
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
                      (res) => toast.success("Question supprimée avec succès ")
                      // window.location.reload()
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

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Dropdown>
        <Dropdown.Toggle fullWidth variant="white" id="dropdown-basic">
          <FontAwesomeIcon icon={faFilter} />
          Filtre
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Form>
            <Row>
              <Col md={4} className="mb-3" style={{ marginLeft: 8 }}>
                <Form.Group >
                  <Form.Label>Intitulé</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    id="entitled"
                    placeholder="Intitulé"
                    onChange={(e) =>
                      setDataFilter({
                        ...dataFilter,
                        entitled: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group >
                  <Form.Label>Thème</Form.Label>
                  <Form.Select
                  id="theme"
                    defaultValue="0"
                    onChange={(e) =>
                      setDataFilter({ ...dataFilter, theme: e.target.value })
                    }
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
            </Row>

            <Row>
              <Col md={4} className="mb-3" style={{ marginLeft: 8 }}>
                <Form.Group >
                  <Form.Label>Statut</Form.Label>
                  <Form.Select
                  id="statut"
                    defaultValue="0"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setDataFilter({ ...dataFilter, statut: e.target.value });
                    }}
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={7} className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Group as={Row} controlId="formHorizontalCheck">
                  <Col sm={{ span: 10, offset: 0.5 }}>
                    <Form.Check
                      id="checkbox"
                      label="Question provocante"
                      onChange={(e) => {
                        if (e.target.checked)
                          setDataFilter({
                            ...dataFilter,
                            type: "Question provocante",
                          });
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalCheck">
                  <Col sm={{ span: 10, offset: 0.5 }}>
                    <Form.Check
                    id="checkbox1"
                      label="Question alternative"
                      onChange={(e) => {
                        if (e.target.checked)
                          setDataFilter({
                            ...dataFilter,
                            type: "Question alternative",
                          });
                      }}
                    />
                  </Col>
                </Form.Group>{" "}
                <Form.Group as={Row} controlId="formHorizontalCheck">
                  <Col sm={{ span: 10, offset: 0.5 }}>
                    <Form.Check
                    id="checkbox2"
                      label="Question motivante"
                      onChange={(e) => {
                        if (e.target.checked)
                          setDataFilter({
                            ...dataFilter,
                            type: "Question motivante",
                          });
                      }}
                    />
                  </Col>
                </Form.Group>{" "}
                <Form.Group as={Row} controlId="formHorizontalCheck">
                  <Col sm={{ span: 10, offset: 0.5 }}>
                    <Form.Check
                    id="checkbox3"
                      label="Question suggestive"
                      onChange={(e) => {
                        if (e.target.checked)
                          setDataFilter({
                            ...dataFilter,
                            type: "Question suggestive",
                          });
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  search(dataFilter);
                }}
              >
                Appliquer
              </Button>

              <Button
                variant="link"
                className="text-gray ms-auto"
                onClick={handleRefresh}
              >
                Rénititialiser
              </Button>
            </div>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
      <div>
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={2} xl={4}></Col>
        </Row>
      </div>
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Intitulé</th>
              <th className="border-bottom">Intitulé de réponse</th>
              <th className="border-bottom">Thème</th>
              <th className="border-bottom">Type</th>
              <th className="border-bottom">Nombre de réponses</th>
              <th className="border-bottom">Statut</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              questions[0]?.map((t) => (
                <TableRow key={`${t.id}`} question={t} />
             
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Précédent</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Suivant</Pagination.Next>
            </Pagination>
          </Nav>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const EnqueteTable = () => {
  const [showDefault2, setShowDefault2] = useState(false);
  const handleClose = () => setShowDefault2(false);
  const [showDefault1, setShowDefault1] = useState(false);
  const [ModalisOpen, setModalisOpen] = useState(false);
  const handleClose1 = () => setShowDefault1(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [ClickedEnquete, setClickedEnquete] = useState([]);
  const [enquetes, setEnquete] = useState([]);
  const [ModalLink, setModalLink] = useState(false);
  const [Linkk, setLinkk] = useState();
  useEffect(() => {
    getAllEnquete().then((res) => {
      //console.log(res.data.data)
      setEnquete([...enquetes, res.data.data]);
    });
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const TableRow = (props) => {
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
          show={showDefault2}
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
                <Dropdown.Item onClick={() => setShowDefault2(true)}>
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
                          `http://192.168.1.15:5000/link/${response.data.data.url}`
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

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Titre</th>
              <th className="border-bottom">Etat</th>
              <th className="border-bottom">Nombre de questions</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquetes[0]?.map((t) => (
              <TableRow key={`${t.id}`} enquete={t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Précédent</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>Suivant</Pagination.Next>
            </Pagination>
          </Nav>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: "5%" }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: "5%" }}>
          <ul className="ps-0">
            {usage.map((u) => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: "50%" }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: "40%" }}>
          <pre>
            <Card.Link href={link} target="_blank">
              Read More{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" />
            </Card.Link>
          </pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table
          responsive
          className="table-centered rounded"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: "5%" }}>
                Name
              </th>
              <th className="border-0" style={{ width: "5%" }}>
                Usage
              </th>
              <th className="border-0" style={{ width: "50%" }}>
                Description
              </th>
              <th className="border-0" style={{ width: "40%" }}>
                Extra
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((c) => (
              <TableRow key={`command-${c.id}`} {...c} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
