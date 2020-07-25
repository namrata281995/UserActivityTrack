import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import ActivityChart from '../chart/activitychart.js'
import ActivityTable from '../activityTable/actvityTable.js'
import { getuseractivity } from '../../service/service.js'
import { Card, Table } from 'react-bootstrap' 
import moment from 'moment/dist/moment.js'
import './activitymodal.css' 

class ActivityModal extends Component {
    constructor(props){
        super(props)
        this.state = { activitydata : [] } 
    }

    datechangehandler = async (e) => { 
        const selectedDate = e.target.value; 

        //call to get the data for that specific selected date
        const activitydata = await getuseractivity(this.props.id,selectedDate)
        this.setState({
            activitydata,
            selectedDate
        })
    }

    getCurrDateString = () =>{
        let currDate =  new Date() 
        let currDateString = currDate.getFullYear() + '-' + ((currDate.getMonth()+1)<10? '0'+(currDate.getMonth()+1): currDate.getMonth()+1) + '-' + currDate.getDate()
        return currDateString
    }

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

    getTimeFromDate = (datetime) => {
        let momentdate = moment(datetime,'MMM DD YYYY hh:mmA').format('hh:mm A') 
        return momentdate
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
                
                    <div className='date_input'>                   
                    <label>Select Activity Date:</label><br></br>
                    <input type='date' value={this.state.selectedDate} onChange={this.datechangehandler} className='date_input_activity'/>
                    </div>

                    <Card className='activitycard'>
                    { this.state.activitydata.length === 0 ? 
                         <div className='nodata'>
                             <span className='nodataspan'>No Activity data available</span>
                         </div> 
                         : <div className='activityinfo'>
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