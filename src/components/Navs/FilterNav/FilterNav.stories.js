import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter, Route } from 'react-router-dom';
import FilterNav from '.';
import { filters } from '../../../config/filters';

import 'bootstrap/dist/css/bootstrap.min.css';

const filterPath = (category, option) => option
  ? `/${category.slug}/${option.tag}`
  : `/${category.slug}`;

const stories = storiesOf('FilterNav', module);
stories.add('Filter Navigation', () => (
  <MemoryRouter>
    <Route path="/:slug?/:tag?" render={({ match, history }) => {
      const filter = filters.find(category => category.slug === match.params.slug) || filters[0];
      const option = filter.options.find(item => item.tag === match.params.tag);
      return (
        <FilterNav
          filter={filter}
          selectedOption={option}
          filterPath={filterPath}
          updateNavSwitch={() => history.push('/')}
        />
      );
    }} />
  </MemoryRouter>
));
