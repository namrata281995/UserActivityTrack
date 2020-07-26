import React, { Component } from 'react';

//to show graph/chart we use a third party library - CanvasJS(assests folder contains the files)
import CanvasJSReact from '../../assets/canvasjs.react';
import moment from 'moment/dist/moment.js'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StepAreaChart extends Component {
  constructor(props){
	super(props)
  }

  //method : return a JS Date object from the given moment object
  constructDateFromMoment = (datetime) => {  
		// parse start time to Date  
		let momentdate = moment(datetime,'MMM DD YYYY hh:mmA') 
		let jsdate = new Date(momentdate.get('year'), momentdate.get('month'), momentdate.get('date'), 
							  momentdate.get('hour'), momentdate.get('minute')) 
		return jsdate
  }

  //method : set hours and minutes to the given date object
  setRangePointTime = (date, hour, minutes) => {
	date.setHours(hour)
	date.setMinutes(minutes)  
  }

  //method : get the range for the chart
  getRanges = () => {
	  let rangestart = new Date(this.props.selectedDate) 
	  this.setRangePointTime(rangestart,9,0)

	  let rangeend = new Date(this.props.selectedDate)	  
	  this.setRangePointTime(rangeend,19,0)

	  return [ { x: rangestart , y: 0}, { x: rangeend, y:0}]   
  }

  //method : construct data points for the chart
  //param 1 : data - arary of start points and endpoint
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
		//get data points for the chart
		const chartdata = this.props.data.length > 0 && this.constructDataPoints(this.props.data)

		//specifying options for the chart
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