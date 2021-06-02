import {Modal} from "@themesberg/react-bootstrap";
import QRCode from "react-qr-code";
import React from 'react'
export default function MyVerticallyCenteredModal(props) {
    
  console.log('props.link')
  console.log(props.link)
    return (
      <Modal
        {...props}
        as={Modal.Dialog}
        centered
        >
       
        
          <h4>Lien</h4>
          <p>
      {/*  {props.link} */}
          </p>
          <QRCode
              //value={props.link}
              size={80}
              level={"L"}
             
              style={{
                width:500,
                height:500
              }}
            />{" "}
       
       
      </Modal>
    );
  }