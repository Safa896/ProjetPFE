  
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngular, faBootstrap, faReact, faVuejs } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar ,Table} from '@themesberg/react-bootstrap';

import Profile1 from "../assets/img/team/profile-picture-1.jpg";
import ProfileCover from "../assets/img/profile-cover.jpg";

import teamMembers from "../data/teamMembers";


export const ViewQuestion = ({question}) => {
  return (
    <Card border="light" className="text-center p-0 mb-4">
      {/* <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" /> */}
      <Card.Body className="pb-5">
      
        <Card.Subtitle className="fw-normal">Intitulé:</Card.Subtitle>
        <Card.Text className="text-gray mb-4">{question.entitled}</Card.Text>
        <Card.Subtitle className="fw-normal">Créateur:</Card.Subtitle>
        <Card.Text className="text-gray mb-4">{question.creator}</Card.Text>
        <Card.Subtitle className="fw-normal">Thème:</Card.Subtitle>
        <Card.Text className="text-gray mb-4">{question.theme}</Card.Text>
        <Card.Subtitle className="fw-normal">Type:</Card.Subtitle>
        <Card.Text className="text-gray mb-4">{question.type}</Card.Text>
        <Card.Subtitle className="fw-normal">Statut:</Card.Subtitle>
        <Card.Text className="text-gray mb-4">{question.statut}</Card.Text>
        <Table>
<thead className="thead-dark">

<th>Réponse:</th>


</thead>



<tbody>
{question.responses.map((res,i)=>(
<tr key={i}>
  <td>{res.reponse}</td>
  
  </tr>
  ))
}

</tbody>
</Table>
        
      </Card.Body>
    </Card>
  );
};



export default ViewQuestion;