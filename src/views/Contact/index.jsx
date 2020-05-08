import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import TabNavs from '../../components/Buttons/TabNavs';
import ContactLinks from '../../components/ContactLinks/';

import './contact.scss';



const ContactPage = props => {

  return (
    <div className="content">
      <header className="page-title">
        <strong>Ways to Connect</strong>
      </header>
      
      <Container className="contact">
        <Tab.Container defaultActiveKey="art">
          <TabNavs art design tech />
          <Tab.Content className="contact-links">
            <Tab.Pane eventKey="art">
              <ContactLinks group="art" displayType="full"/>
            </Tab.Pane>
            <Tab.Pane eventKey="design">
              <ContactLinks group="design" displayType="full" />
            </Tab.Pane>
            <Tab.Pane eventKey="tech">
              <ContactLinks group="tech" displayType="full" />
            </Tab.Pane>
          </Tab.Content>

        </Tab.Container>
      </Container>
      
        
    </div>
  )
  
}

export default ContactPage;
