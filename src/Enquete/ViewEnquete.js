  
import React, { useEffect } from "react";
import { Card,Table } from '@themesberg/react-bootstrap';
import axios from "axios";
export const ViewEnquete = (props) => {
  const enquete = props.enquete;
  console.log(enquete)
 
  return (
    
    <Card border="light" style={{width:500}} >
      {/* <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" /> */}
      <Card.Body className="pb-8">
      
        <Card.Subtitle className="fw-normal">Titre:</Card.Subtitle>
        <Card.Text className="text-gray mb-4"> {enquete.titre}</Card.Text>
        <Card.Subtitle className="fw-normal">Etat:</Card.Subtitle>
        <Card.Text className="text-gray mb-4"> {enquete.etat}</Card.Text>
        <Table>
<thead className="thead-light">

<th>Titre</th>
<th >Type question</th>
<th >Thème</th>

</thead>



<tbody>
{enquete.questions.map((question,i)=>(
<tr key={i}>
  <td>{question.entitled}</td>
  <td>{question.type}</td>
  <td>{question.theme}</td>
  </tr>
  ))
}

</tbody>
</Table>
      </Card.Body>
    </Card>
  );
};



export default ViewEnquete;