import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCogs,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Breadcrumb,
  Form,
  Modal,
  Table
} from "@themesberg/react-bootstrap";
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
import { EnqueteTable } from "../components/Tables";
import CreationEnquete from "../Enquete/CreationEnquete";
import Configuration from "../Enquete/Critere_user";

export default () => {
  const [showDefault, setShowDefault] = useState(false);
  const [showDefault1, setShowDefault1] = useState(false);
  const handleClose = () => setShowDefault(false);
   const handleClose1 = () => setShowDefault1(false);
  return (
    <>
      <Breadcrumb
        className="d-none d-md-inline-block"
        listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
      >
        <Breadcrumb.Item>
          <FontAwesomeIcon icon={faHome} />
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Enquête</Breadcrumb.Item>
      </Breadcrumb>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          <Button
            variant="secondary"
            className="text-dark me-2"
            onClick={() => setShowDefault(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>Créer une enquête</span>
          </Button>
        </Dropdown>
        <Modal
          as={Modal.Dialog}
          centered
          show={showDefault}
          onHide={handleClose}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title className="h6">Créer une enquête </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>
         
           <CreationEnquete/>
         
        </Modal>
        <Modal
          as={Modal.Dialog}
          centered
          show={showDefault1}
          onHide={handleClose1}
        >
          <Modal.Header>
            <Modal.Title className="h6">Critères à remplir par les utilisateurs </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose1} />
          </Modal.Header>
         
           <Configuration/>
         
        </Modal>

        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle as={Button} variant="primary"  onClick={() => setShowDefault1(true)}>
              <FontAwesomeIcon icon={faCogs} className="me-2" /> Configuration
              critères
            </Dropdown.Toggle>
          </Dropdown>
        </div>
      </div>

      <Row>
     <EnqueteTable />
      </Row>
    </>
  );
};
