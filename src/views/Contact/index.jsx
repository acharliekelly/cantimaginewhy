import React from 'react';

import ContactLinks from '../../components/ContactLinks/';

import './contact.scss';

const ContactPage = props => (
  <div className="content">
    <header className="page-title">
      <h2><strong>How to Contact Me</strong></h2>
    </header>
    <main className="contact">
      
      <div className="contact-links">
        <ContactLinks displayType="full" size="2x" textSize="2em" />
      </div>
      
    </main>
  </div>
);

export default ContactPage;
