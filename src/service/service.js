import data from '../data/Test JSON.json' //importing sample data from JSON file
import moment from 'moment/dist/moment.js' //importing moment to handle date and time related operations

const parseAndCompareDates = (date1, date2) => { 
    try{
        //check if the given two dates which are in different format are same dates
        return moment(date1,'MMM DD YYYY').format("MMM DD YY") === moment(date2).format("MMM DD YY")
    }
    catch(e){
        console.log(e)
    }
}

export const getuserlist = async () => { 
    try{
    //this is the place we can have a call to the api 
    //since this is sample data, we simply return data from json file
    return data.members;
    }
    catch(e){
        console.log(e)
    }
}

export const getuseractivity = async (id, selecteddate) => { 
    let activity = [] 

    try{
    //find the member for whom activitydata is requested
    const index = data.members.findIndex( element => element.id === id) 
    if(index >=0)
    {
    //if member is found
    const member = data.members[index] 
    //get all the activities that have the specified seleceted date
    activity = member.activity_periods.filter( element => parseAndCompareDates(element.start_time,selecteddate))
    }
    return activity
    }
    catch(e){
        console.log(e)
    }
}

