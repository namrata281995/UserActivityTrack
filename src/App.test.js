import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import {configure , shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import Users from './components/users/users'

configure({adapter : new Adapter()});

describe('<App/>', () => {
  it('should render one <Users/> element',() => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Users)).toHaveLength(1)
  })
})