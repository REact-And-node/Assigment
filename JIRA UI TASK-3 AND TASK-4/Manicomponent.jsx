import React from 'react';
import TableComponent from './TABLECOMPONENT';
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/material';
function App() {
  return (
    <div className="container">
          <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
   JIRA SOFTWARE 
    </a>
  </div>
</nav>
      <TableComponent />
     
    </div>
  );
}

export default App;
