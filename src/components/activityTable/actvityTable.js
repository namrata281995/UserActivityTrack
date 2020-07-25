import React from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment/dist/moment.js'
import './activityTable.css'

const ActivityTable = (props) => {

    let getTimeFromDate = (datetime) => {
        let momentdate = moment(datetime,'MMM DD YYYY hh:mmA').format('hh:mm A')
        return momentdate
    }

    let count = 1

    return (
        <div className='activityTable'>
            <Table>
                <thead>
                    <th>#</th>
                    <th>Start</th>
                    <th>End</th>
                </thead>
                <tbody>
                    {
                        props.activitydata.map( element => 
                            <tr>
                                <td>{count++}</td>
                                <td>{getTimeFromDate(element.start_time)}</td>
                                <td>{getTimeFromDate(element.end_time)}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ActivityTable