import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { extractDomainName } from '../../../utils/system';


const ExtLink = props => (
  <OverlayTrigger
    placement={props.placement}
    delay={{ show: 250, hide: 400 }}
    overlay={
      <Tooltip>
        {props.showIcon && (
          <FontAwesomeIcon icon="external-link-alt" size="xs" style={{marginRight: '1em'}} />
        )}
        {extractDomainName(props.destinationUrl)}
      </Tooltip>
    }
  >
    <a target="_blank" rel="noopener noreferrer" 
      href={props.destinationUrl}
      style={{marginLeft: '0.5em', marginRight: '0.5em'}}>
      {props.linkText}
    </a>
  </OverlayTrigger>
);

const ExternalLink = props => {
  if (props.linkOnly) {
    return ExtLink(props);
  } else {
    return (
      <OverlayTrigger
        placement={props.placement}
        delay={{ show: 250, hide: 400 }}
        overlay={
          <Tooltip>{extractDomainName(props.destinationUrl)}</Tooltip>
        }
      >
        <Button as="a" target="_blank" rel="noopener noreferrer" 
          variant={props.variant} href={props.destinationUrl}>
          {props.linkText}
          {props.showIcon && (
            <FontAwesomeIcon icon="external-link-alt" size="xs" style={{marginLeft: '1em'}} />
          )}
        </Button>
      </OverlayTrigger>
    )
  }
}

ExternalLink.propTypes = {
  destinationUrl: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  variant: PropTypes.string,
  showIcon: PropTypes.bool,
  placement: PropTypes.string,
  linkOnly: PropTypes.bool
};

ExternalLink.defaultProps = {
  showIcon: false,
  variant: 'outline-dark',
  placement: 'top',
  linkOnly: false
};

export default ExternalLink;
