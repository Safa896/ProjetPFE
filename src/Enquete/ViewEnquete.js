  
import React, { useEffect ,useState} from "react";
import { Card,Table,Button,Modal } from '@themesberg/react-bootstrap';
import axios from "axios";
import CreationClient from "../Enquete/CreationClient";
import { useHistory } from "react-router-dom";

export const ViewEnquete = (props) => {
  const enquetes = props.enquete;
  console.log(enquetes)
  const[showClient,setshowClient]=useState(false);
  const handleClose = () => setshowClient(false);
  let History = useHistory ();

  return (
    
    <Card border="light" style={{width:800}} >
      {/* <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" /> */}
      <Card.Body className="pb-8">
      
        <Card.Subtitle className="fw-normal">Titre:</Card.Subtitle>
        <Card.Text className="text-gray mb-4"> {enquetes.titre}</Card.Text>
        <Card.Subtitle className="fw-normal">Etat:</Card.Subtitle>
        <Card.Text className="text-gray mb-4"> {enquetes.etat}</Card.Text>
        <Table>
<thead className="thead-light">

<th>Titre</th>
<th >Type question</th>
<th >Thème</th>

</thead>



<tbody>
{enquetes.questions.map((question,i)=>(
<tr key={i}>
  <td>{question.entitled}</td>
  <td>{question.type}</td>
  <td>{question.theme}</td>
  
  </tr>
  ))
}

</tbody>
</Table>
<Modal
          as={Modal.Dialog}
          centered
          show={showClient}
          onHide={handleClose}
          
        >
          <Modal.Header>
            <Modal.Title className="h6">Saisir informations personnelles</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>
          <CreationClient />
        </Modal>
<div className="mt-3">
                    <Button
                      variant="primary"
                      style={{marginLeft:300}}
                      onClick={() => setshowClient(true)
                        }
                      
                    >
                     Répondre
                    </Button>
                    </div>
      </Card.Body>
    </Card>
  );
};



export default ViewEnquete;