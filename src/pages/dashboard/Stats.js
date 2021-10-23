
import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiking, faCashRegister, faHome,faChartLine, faCloudUploadAlt, faCoffee, faFilm, faHotel, faPlus, faRocket, faTasks, faUserShield, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup , Breadcrumb } from '@themesberg/react-bootstrap';
import VerticalBarGraph from '@chartiful/react-vertical-bar-graph'
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import axios from "axios";



export default () => {
    const [selectedTheme, setselectedTheme] = useState('Salle de sport')
    const [Data, setData] = useState([])
    const getSatatBytheme=(theme)=>{
        axios.get('http://localhost:5000/stats/'+theme).then(res=>{
              setData(res.data.data[1])
              console.log(res.data.data[1])
        })
  }
   
useEffect(() => {
    getSatatBytheme('salle de sport')
    }, [])
  return (
    <>
     
     <Breadcrumb
        className="d-none d-md-inline-block"
        listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
      >
        <Breadcrumb.Item>
          <FontAwesomeIcon icon={faHome} />
        </Breadcrumb.Item>
        
        <Breadcrumb.Item active>Statistiques</Breadcrumb.Item>
      </Breadcrumb>  
        
        
      
      

       

     

      <Row style={{
          alignItems:"center",
          justifyContent:"center",
          display:"flex",
          textAlign:"center"
      }}>
          <h1>{selectedTheme}</h1>
        <Col xs={12} xl={12} className="mb-4 center">
          <Row>
          

            <Col xs={12} xl={12}>
              <Row>
                <Col xs={12} className="mb-4">
              { Data.length>1&& <VerticalBarGraph
  data={Data}
  labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']}
  width={800}
  height={500}
  barRadius={5}
  barWidthPercentage={0.65}
  baseConfig={{
    hasXAxisBackgroundLines: false,
   
    
    xAxisLabelStyle:{
        position:"left"
    }
  }}
  barColor="#298BED"
  style={{
    paddingVertical: 10
  }}
  
  
/>}
{
    Data.length<1 && <h1>Aucune donnée !</h1>
}
                </Col>

               

              
              </Row>
            </Col>
          </Row>
        </Col>
        <Row>
        <Col xs={12} xl={12} className="mb-4 center">
            <Row>
                <Col>
                <Button  variant="link"
                className="text-gray ms-auto" onClick={
                ()=>{
                    setselectedTheme('Salle de sport')
                    getSatatBytheme('salle de sport')
                }
                }>
                        <FontAwesomeIcon icon={faBiking} className="me-2" />
                    Salle de sport</Button>
                </Col>
                <Col>
                <Button  variant="link"
                className="text-gray ms-auto"  onClick={
                    ()=>{
                        setselectedTheme('Salle de cinéma')
                        getSatatBytheme('salle de cinéma')
                    }
                    }>
                        <FontAwesomeIcon icon={faFilm} className="me-2" />Salle de cinéma</Button>
                </Col>
                <Col>
                <Button  variant="link"
                className="text-gray ms-auto" onClick={
                    ()=>{
                        setselectedTheme('Restaurant')
                        getSatatBytheme('restaurant')
                    }
                    }> <FontAwesomeIcon icon={faUtensils} className="me-2" />Restaurant</Button>
                </Col>
                <Col>
                <Button  variant="link"
                className="text-gray ms-auto"  onClick={
                    ()=>{
                        setselectedTheme('Café')
                        getSatatBytheme('cafe')
                    }
                    }> <FontAwesomeIcon icon={faCoffee} className="me-2" />Café</Button>
                </Col>
                <Col>
                <Button  variant="link"
                className="text-gray ms-auto"  onClick={
                    ()=>{
                        setselectedTheme('Hôtel')
                        getSatatBytheme('hôtels')
                    }
                    }> <FontAwesomeIcon icon={faHotel} className="me-2" />Hôtel</Button>
                </Col>

            </Row>
            </Col>
        </Row>
      </Row>
    </>
  );
};
