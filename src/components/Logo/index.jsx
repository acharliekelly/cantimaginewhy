import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Transformation } from 'cloudinary-react';
import classNames from 'classnames';
import HelpButton from '../Buttons/HelpButton';
import './logo.scss';


const LogoImg = ({ size, handler, title = 'Logo' }) => (
  <Image className="logo" publicId="icon/logo" title={title} onClick={handler}>
    <Transformation height={size} width={size} crop="scale" />
  </Image>
);


/**
 * When expanded, show container with options
 * When collapsed, just show logo, expand on click
 * 
 * TODO: hide Home button when already home
 */
const Logo = props => {
  const [ expanded, setExpanded ] = useState(false);  
  const { logoSize, allowExpand } = props;

  const collapse = () => setExpanded(false);
  const toggle = () => setExpanded(!expanded);

  const containerStyle = {
    height: `${logoSize}px`,
    width: `${logoSize * 3}px`
  }
  const imgTitle = expanded ? 'Collapse' : 'Logo';
  
  if (!allowExpand) {
    return (
      <Link to='/'>
        <LogoImg size={logoSize} />
      </Link>
    )
  } else {
    const containerCls = classNames('logo-container', { 'expanded': expanded });
    return (
      <Container className={containerCls} style={containerStyle}>
        <LogoImg size={logoSize} title={imgTitle} handler={toggle} />
        {expanded && (
          <span className="logo-options" style={{
            marginLeft: `${logoSize + 10}px`,
            marginTop: `-${logoSize}px`
            }}>
              
            <Link to="/">
              <Button variant="info" title="Home" onClick={collapse}>
                <FontAwesomeIcon icon="home" />
              </Button>
            </Link>
            
            <Link to="/artwork/tag/logo">
              <Button variant="primary" title="Browse Logos" onClick={collapse}>
                <FontAwesomeIcon icon="icons" />
              </Button>
            </Link>
            
            
            <HelpButton header="Logos" variant="success" title="What's This?"
              content="I came up with several different logo ideas. Want to see them all?" />
          </span>
        )}
      </Container>
    )
  }
  
}



Logo.propTypes = {
  /**
   * Size of logo image, in pixels
   */
  logoSize: PropTypes.number,

  /**
   * expand container when logo clicked
   */
  allowExpand: PropTypes.bool

};

Logo.defaultProps = {
  logoSize: 80,
  allowExpand: true
};


export default Logo;
