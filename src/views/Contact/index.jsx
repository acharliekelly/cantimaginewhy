import React, { useRef, useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import ContactLinks from '../../components/ContactLinks/';
import { useResize } from '../../components/HigherOrder/useResize';
import './contact.scss';

const breakpoints = [
  {
    max: 2000,
    min: 751,
    size: '2x',
    textSize: '2em',
    displayType: 'full'
  },
  {
    max: 750,
    min: 251,
    size: 'lg',
    textSize: '1em',
    displayType: 'both'
  },
  {
    max: 250,
    min: 2,
    size: 'sm',
    textSize: '0.8em',
    displayType: 'both'
  },
  {
    max: 1,
    min: 0,
    size: '2x',
    textSize: '2em',
    displayType: 'full'
  }
]

const getBreakpointProps = compWidth => {
   return breakpoints.find(point => point.max >= compWidth && point.min <= compWidth);;
}


const ContactPage = props => {
  const componentRef = useRef();
  const { width } = useResize(componentRef);
  const [ displayProps, setDisplayProps ] = useState(null);

  useEffect(() => {
    setDisplayProps(getBreakpointProps(width));

  }, [width])

  return (
    <div className="content">
      <header className="page-title">
        <h2><strong>Ways to Connect</strong></h2>
      </header>
      
      <main className="contact" ref={componentRef}>
        <Tab.Container defaultActiveKey="art">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="art">Art</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tech">Tech</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="contact-links">
            <Tab.Pane eventKey="art">
              <ContactLinks group="art" {...displayProps} />
            </Tab.Pane>
            <Tab.Pane eventKey="tech">
              <ContactLinks group="tech" {...displayProps} />
            </Tab.Pane>
          </Tab.Content>

        </Tab.Container>

        {/* <div className="test">Width: {width}</div> */}

      </main>
      
        
    </div>
  )
  
}

export default ContactPage;
