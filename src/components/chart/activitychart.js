import React, { Component } from 'react';
import moment from 'moment/dist/moment.js'
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StepAreaChart extends Component {
  constructor(props){
	super(props)
  }

  constructDateFromMoment = (datetime) => {  
		// parse start time to Date  
		let momentdate = moment(datetime,'MMM DD YYYY hh:mmA') 
		let jsdate = new Date(momentdate.get('year'), momentdate.get('month'), momentdate.get('date'), 
							  momentdate.get('hour'), momentdate.get('minute')) 
		return jsdate
  }

  setRangeTPointTime = (date, hour, minutes) => {
	date.setHours(hour)
	date.setMinutes(minutes)  
  }

  getRanges = () => {
	  let rangestart = new Date(this.props.selectedDate) 
	  this.setRangeTPointTime(rangestart,9,0)

	  let rangeend = new Date(this.props.selectedDate)	  
	  this.setRangeTPointTime(rangeend,19,0)

	  return [ { x: rangestart , y: 0}, { x: rangeend, y:0}]   
  }

  constructDataPoints = (data) => {    
	  let dataPoints = this.getRanges()   
	  data.forEach((element) => {			
			let startpoint = { x : this.constructDateFromMoment(element.start_time) , y : 1} 
			let endpoint = { x : this.constructDateFromMoment(element.end_time), y : 0 } 

			dataPoints.push(startpoint)
			dataPoints.push(endpoint)
		})  
	return dataPoints
  }

	render() {  
		const chartdata = this.props.data.length > 0 && this.constructDataPoints(this.props.data)
		const options = {
			animationEnabled: true,
			//exportEnabled: true,
			// title:{
			// 	text: "Activity"
			// },
			width :'400',
			height:'250',
			creditText:'',
			data: [
				{
					type: "stepArea",
        			xValueFormatString: "HH", 
					dataPoints: chartdata
				}
			]
		}
     
		return (
		<div>
			<CanvasJSChart options = {options}/>  
		</div>
		);
	}
}

export default StepAreaChart;                           