import data from '../data/Test JSON.json'
import moment from 'moment/dist/moment.js'

const parseAndCompareDates = (date1, date2) => { 
    try{
        return moment(date1,'MMM DD YYYY').format("MMM DD YY") === moment(date2).format("MMM DD YY")
    }
    catch(e){
        console.log(e)
    }
}

export const getuserlist = async () => { 
    try{
    return data.members;
    }
    catch(e){
        console.log(e)
    }
}

export const getuseractivity = async (id, selecteddate) => { 
    let activity = [] 

    try{
    const index = data.members.findIndex( element => element.id === id) 
    if(index >=0)
    {
    const member = data.members[index] 
    activity = member.activity_periods.filter( element => parseAndCompareDates(element.start_time,selecteddate))
    }
    return activity
    }
    catch(e){
        console.log(e)
    }
}

