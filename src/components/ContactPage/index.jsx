import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import TabNavs from '../Buttons/TabNavs';
import ContactLinks from '../../components/ContactLinks';
import { contactText } from '../../json/text';
import withSizes from 'react-sizes';
import './contact.scss';



const ContactPage = props => {
  const displayStyle = props.showDescription ? 3 : 2;

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
              <p className="connect-text">{contactText.art}</p>
              <ContactLinks group="art" display={displayStyle} />
            </Tab.Pane>
            <Tab.Pane eventKey="design">
              <p className="connect-text">{contactText.design}</p>
              <ContactLinks group="design" display={displayStyle} />
            </Tab.Pane>
            <Tab.Pane eventKey="tech">
              <p className="connect-text">{contactText.tech}</p>
              <ContactLinks group="tech" display={displayStyle} />
            </Tab.Pane>
          </Tab.Content>

        </Tab.Container>
      </Container>
      
        
    </div>
  )
  
}

const mapSizesToProps = sizes => ({
  showDescription: sizes.width >= 1000
});

export default withSizes(mapSizesToProps)(ContactPage);
