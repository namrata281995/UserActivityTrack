import React, { Component } from "react";
import { Card } from 'react-bootstrap'
import { getuserlist } from '../../service/service.js'
import ActivityModal from "../modal/activitymodal";
import User from '../user/user.js'
import './users.css';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showModal: false,
      selecteduserid : ''
    }
  }

  //open modal that shows the activity details for the selected user
  showactivitydetails = (id) => { 
    this.setState({
      showModal: true,
      selecteduserid : id
    });
  };

  //get the users list after component has mounted
  componentDidMount = async () =>{
    const users = await getuserlist()
    this.setState({
      users
    })
  }

  //close the modal
  handleModalClose = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className='userlist'>
        {         
        this.state.users.length === 0 ? 
        <div className='nodatacard'><Card> <div className='nouserdata'>No Users Available </div></Card></div>
        :       
        <div>   
        {/* Users List */}
        <div className='usercards'>
        {this.state.users.map((user) => 
         <div className='usercard' key={user.id}>
          <Card className="users" id={user.id} onClick={() => this.showactivitydetails(user.id)}> 
            <User user={user}/>
          </Card>

         </div>
        )}
        </div>

        {/* Modal that shows activity details for selected user*/}
        {this.state.showModal && <ActivityModal
          show={this.state.showModal}
          handleClose={ this.handleModalClose }
          id= {this.state.selecteduserid}
        />
      }
      </div> 
      }
      </div>
    );
  }
}

export default Users;
