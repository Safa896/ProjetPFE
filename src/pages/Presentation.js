import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
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
  Table
} from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getAllQuestions} from "../Services/listingServices";
import { useEffect } from "react";
import BgImage from "../assets/img/illustrations/signin.svg";
import axios from "axios";


export const Presentation = (props) => {
  let History = useHistory ();
  const [questionsByTheme, setQuestionsByTheme] = useState([]);
  const [questions, setquestions] = useState([]);
  const enquetes = props.enquete;
  console.log(enquetes)
  const fetchQuestionByTheme = (theme) => {
    console.log(enquetes.questions.theme)
    axios
      .get(`http://localhost:5000/questions/getbytheme/${enquetes.questions.theme}`)
      .then((res) => {
        console.log(res.data)
        setQuestionsByTheme(
          questionsByTheme.concat(res.data["data"]).reverse()
         
        );
      });
  };
  useEffect((theme) => {
    axios
    .get(`http://localhost:5000/questions/getbytheme/${theme}`)
    .then((res) => {
      console.log(res.data)
      setQuestionsByTheme(
        questionsByTheme.concat(res.data["data"]).reverse()
        
       
      );
    });
  /*   getAllQuestions().then((res) => {
      console.log(res.data.data)
      setquestions( res.data.data.reverse());
    }); */
  }, []);
  
  return (
    <main>
      <div className="d-flex align-items-center my-5 mt-lg-6 mb-lg-6" >
        <Container className="themed-container" fluid={true}>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Répondre aux questions </h3>
                </div>
                
                <Table>
                  <thead className="thead-light">
                  { questionsByTheme.map((question, i) => (
                    <tr hover key={i}>
                     
                      <th className="border-0">{`Q${i + 1}.`}</th>
                      <th className="border-0">{question["entitled"]}</th>
                      {question.responses.map((res,id)=>(
<tr key={id}>
<Form.Check
                            
                              />
  <td>{res.reponse}</td>
  
  </tr>
  ))
}
                    </tr>
                     ))}
                  </thead>
                  <tbody>
                    <>
                     
                    {questionsByTheme.responses?.map((res,id)=>(
<tr key={id}>
  <td>{res.reponse}</td>
  
  </tr>
  ))
}
                     
                    
                     
                    </>
                  </tbody>
                </Table>
                <div className="mt-3">
                    <Button
                      variant="primary"
                      style={{marginLeft:160}}
                      onClick={() => alert("Merci de répondre à ce questionnaire")
                      }
                    
                      
                      
                    >
                     Répondre
                    </Button>
                    </div>
               
              </div>
            </Col>
            
          </Row>
       
        </Container>
      </div>
    </main>
  );
};
export default Presentation;