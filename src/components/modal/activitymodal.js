import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Card, Table } from 'react-bootstrap' 

import ActivityChart from '../chart/activitychart.js'
import ActivityTable from '../activityTable/actvityTable.js'
import { getuseractivity } from '../../service/service.js'
 
import './activitymodal.css'

class ActivityModal extends Component {
    constructor(props){
        super(props)
        this.state = { activitydata : [] } 
    }

    //method : When date is changed, get the activity data for that date and display the same
    datechangehandler = async (e) => { 
        const selectedDate = e.target.value; 

        //call to get the activity data for that specific selected date
        const activitydata = await getuseractivity(this.props.id,selectedDate)
        this.setState({
            activitydata,
            selectedDate
        })
    }

    //method : Get the Date string in format YYYY-MM-DD(e.g : "2020-07-26") from a Date object for current date
    getCurrDateString = () =>{
        let currDate =  new Date() 
        let currDateString = currDate.getFullYear() + '-' + ((currDate.getMonth()+1)<10? '0'+(currDate.getMonth()+1): currDate.getMonth()+1) + '-' + currDate.getDate()
        return currDateString
    }

    //method : Get the activity data for current date (default scenario)
    componentDidMount = async () => {  
        if(this.props.id !== undefined)
        {       
        const currDateString = this.getCurrDateString()
        const activitydata = await getuseractivity(this.props.id, currDateString);   
        this.setState({
            activitydata,
            selectedDate : currDateString
        }) 
        }
    }
    
    render() { 
        return(
            <div className='activityModal'>

            {/* Bootstrap Modal */}
            <Modal show={this.props.show} onHide={this.props.handleClose} className='modal' size='lg'
              backdrop="static" keyboard={false}> 
                <Modal.Header closeButton>
                <Modal.Title><psan className='modal_title'>User Activity</psan></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* Date Picker */}
                    <div className='date_input'>                   
                    <label>Select Activity Date:</label><br></br>
                    <input type='date' value={this.state.selectedDate} onChange={this.datechangehandler} className='date_input_activity'/>
                    </div>

                    {/* Activity Info the selected date */}
                    <Card className='activitycard'>
                    { this.state.activitydata.length === 0 ? 
                         <div className='nodata'>
                             <span className='nodataspan'>No Activity data available</span>
                         </div> 
                         : <div className='activityinfo'>

                             {/* Activity Table */}
                             <div className='activitydetails'>
                                <div>Activity Details</div>                               
                                <ActivityTable activitydata={this.state.activitydata}/>
                             </div>

                                {/* Activity Chart */}
                              <div className='activitychart'>
                                <ActivityChart data={this.state.activitydata} selectedDate = {this.state.selectedDate}/>
                              </div>
                           </div> 
                    }
                    </Card>
                </Modal.Body> 
            </Modal>
            </div>
        )
    }
}

export default ActivityModal