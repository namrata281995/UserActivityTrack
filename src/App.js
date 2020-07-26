import React from 'react'; 
import Users from './components/users/users.js'
import './App.css';

function App() {
  return (
    <div className="App">
      
      <div className='availableuser'>
          <span className='availableusersspan'>Available Users<hr></hr></span>
      </div>

      {/* Component that renders List of available Users */}
       <Users/> 
    </div>
  );
}

export default App;
