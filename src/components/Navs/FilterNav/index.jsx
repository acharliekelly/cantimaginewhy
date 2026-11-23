import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import NavButton from '../NavButton';
import { filters, navDescription } from '../../../config/filters';
import HelpButton from '../../Buttons/HelpButton/';
import NavSwitch from '../NavSwitch';
import '../nav.scss';

const FilterNav = ({ filter, selectedOption, filterPath, updateNavSwitch, thumbSize }) => {
  const [preview, setPreview] = useState(null);
  const description = preview?.filter === filter ? preview.description : filter.description;
  const showPreview = description => setPreview({ filter, description: description || filter.description });
  const clearPreview = () => setPreview(null);

  return (
    <>
      <Navbar className="category-bar filter-bar justify-content-between">
        <NavSwitch type="filter" updateNavSwitch={updateNavSwitch} />
        <Container className="filter-wrapper justify-content-center">
          <ListGroup className="filters flex-row flex-wrap justify-content-center">
            {filters.map(category => (
              <ListGroup.Item
                key={category.slug}
                as={Link}
                to={filterPath(category)}
                action
                active={category === filter}
                aria-current={category === filter}
                onMouseEnter={() => showPreview(category.description)}
                onMouseLeave={clearPreview}
                onFocus={() => showPreview(category.description)}
                onBlur={clearPreview}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
        <HelpButton header="Filters" content={navDescription} size="2x" />
      </Navbar>

      <Container className="album-bar">
        <p className="filter-description">{description}</p>
        <div className="albums">
          {filter.options.map(option => (
            <NavButton
              key={option.tag}
              navTag={option}
              to={filterPath(filter, option)}
              isSelected={selectedOption === option}
              thumbnailHeight={thumbSize}
              onHover={() => showPreview(option.description)}
              onOut={clearPreview}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

FilterNav.propTypes = {
  filter: PropTypes.object.isRequired,
  selectedOption: PropTypes.object,
  filterPath: PropTypes.func.isRequired,
  thumbSize: PropTypes.number,
  updateNavSwitch: PropTypes.func
};

FilterNav.defaultProps = {
  thumbSize: 80
};

export default FilterNav;
