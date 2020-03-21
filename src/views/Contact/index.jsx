import React from 'react';
// import Container from 'react-bootstrap/Container';

import ContactLinks from '../../components/ContactLinks/';

import './contact.scss';

const ContactPage = props => (
  <div className="content">
    
    <main className="contact">
      
      <div className="contact-links">
        <ContactLinks layout="vert" displayType="both" size={3} />
      </div>
      
    </main>
  </div>
);

export default ContactPage;
