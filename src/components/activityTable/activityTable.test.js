import React from 'react'
import {configure , shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ActivityTable from './actvityTable'
import {Table} from 'react-bootstrap'

configure({adapter : new Adapter()});

describe('<ActivityTable/>', () => {
  it('should render one <Table/> element',() => {
    const wrapper = shallow(<ActivityTable activitydata = {[{
        "start_time": "Jul 25 2020  1:33PM",
        "end_time": "Jul 25 2020 1:54PM"
    }]}/>);
    expect(wrapper.find(Table)).toHaveLength(1)
  })
})