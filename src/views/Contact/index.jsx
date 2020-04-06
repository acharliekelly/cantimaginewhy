import React from 'react';
import Tab from 'react-bootstrap/Tab';
import TabNavs from '../../components/Navs/TabNavs';
import ContactLinks from '../../components/ContactLinks/';

import './contact.scss';



const ContactPage = props => {

  return (
    <div className="content">
      <header className="page-title">
        <strong>Ways to Connect</strong>
      </header>
      
      <main className="contact">
        <Tab.Container defaultActiveKey="art">
          <TabNavs />
          <Tab.Content className="contact-links">
            <Tab.Pane eventKey="art">
              <ContactLinks group="art" displayType="full"/>
            </Tab.Pane>
            <Tab.Pane eventKey="tech">
              <ContactLinks group="tech" displayType="full" />
            </Tab.Pane>
          </Tab.Content>

        </Tab.Container>
      </main>
      
        
    </div>
  )
  
}

export default ContactPage;
