import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faHome,
  faSearch,
  faPlus,
  faPaperclip,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Dropdown,
  Modal,
} from "@themesberg/react-bootstrap";
import { TransactionsTable } from "../components/Tables";
import CreationQuestion from "../Bib_question/CreationQuestion";
import axios from "axios";
import { saveAs } from "file-saver";
export default () => {
  const [questions, setquestions] = useState([]);

  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  useEffect(() => {
    function fetching() {
      axios.get("http://localhost:5000/questions").then((res) => {
        setquestions(questions.concat(res.data["data"]));
 
      });
    }
    fetching();
  }, []);
  const createAndDownloadPdf = () => {
    axios
      .post("http://localhost:5000/questions/create-pdf", questions)
      .then(() =>
        axios.get("http://localhost:5000/questions/fetch-pdf", {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "question_liste.pdf");
      });
  };
  return (
    <>
      <div className="d-block mb-4 mb-md-0">
        <Breadcrumb
          className="d-none d-md-inline-block"
          listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
        >
          <Breadcrumb.Item>
            <FontAwesomeIcon icon={faHome} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item active>Bibliothèque des questions</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        {/*   <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Bibliothèque des questions</Breadcrumb.Item>
          </Breadcrumb>
          
        </div> */}

        <div style={{ marginRight: 900 }}>
          <Dropdown>
            <Button
              variant="secondary"
              className="text-dark me-2"
              onClick={() => setShowDefault(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              <span>Créer une question</span>
            </Button>
          </Dropdown>
          <Modal
            as={Modal.Dialog}
            centered
            show={showDefault}
            onHide={handleClose}
          >
            <Modal.Header>
              <Modal.Title className="h6">Créer une question </Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose}
              />
            </Modal.Header>
            <CreationQuestion />
          </Modal>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={createAndDownloadPdf}
          >
            <FontAwesomeIcon icon={faFilePdf} className="me-2" />
            Export PDF
            
          </Button>
        </div>
      </div>

      <TransactionsTable />
    </>
  );
};
