import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import { Image, Transformation } from 'cloudinary-react';
// import { defaultImg } from '../../../utils/cloudinaryApi';
import { filters, navDescription } from '../../../config/filters';
import HelpButton from '../../Buttons/HelpButton/';
import NavSwitch from '../NavSwitch';
import '../nav.scss';


const FilterNav = props => {
  const isActiveFilter = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent ? { className: 'active-filter' } : {}
  }
  // const isSelectedNav = ({ isCurrent }) => {
  //   return isCurrent ? { className: 'selected-nav'} : {}
  // }
  
  return (
    <React.Fragment>
      <Navbar className="category-bar justify-content-between">
        <NavSwitch navType="album" {...props} />
        <Container className="filter-wrapper justify-content-center" lg={4} md={6} sm={8}>
          <ul className="filters">
            {filters.map((filter, index) => (
              <li key={index}>
                <Link getProps={isActiveFilter} to={`/artwork/filters/${index}`}>{filter.name}</Link>
              </li>
            ))}
          </ul>
        </Container>
        <HelpButton header="Filters" content={navDescription} size="2x" />
      </Navbar>

      <Container expand="lg" className="album-bar albums">
        {/* TODO: add filters */}
        <div className="todo">Filters go here</div>
      </Container>
    </React.Fragment>
  )
}

FilterNav.propTypes = {
  thumbSize: PropTypes.number,
};

FilterNav.defaultProps = {
  thumbSize: 80
}

export default FilterNav;
