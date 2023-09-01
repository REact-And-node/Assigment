import React, { useState, useEffect } from 'react';
import "./table.css"
import http from './httpServer';

function TableComponent() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(''); // Initial value is 'select'
  const [issueKey, setissueKey] = useState(''); // Initial value is 'select'

 

  const page = (a) => {
    setCurrentPage(currentPage + a);
  }
  const handleOptionClick = (event, itemId) => {
    const clickedValue = event.target.value;
console.log(itemId,clickedValue)
  setissueKey(itemId)
      setSelectedValue(clickedValue);
     
    
  } 
  useEffect(() => {
    const fetchData = async () => {
      const response = await http.get(`/change-status?issueKey=${issueKey}`);
    
    }
    fetchData();
    setissueKey("")
    setSelectedValue("")
    
  }, [issueKey]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await http.get(`/getAllIssuesfromdatabase?page=${currentPage}`);
      setData(response.data);
    } 
    
        fetchData();
  
 
  }, [currentPage, data1,issueKey]);
  
  return (
    <div className="table-container">
      <h2>Data Table</h2>
      <button className='btn btn-warning' onClick={() => setData1(prev => !prev, setCurrentPage(1))}>RE-FETCH</button>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Summary</th>
              <th>Reporter</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.key}</td>
                <td>{item.fields.summary}</td>
                <td>{item.fields.reporter.emailAddress}</td>
                <td >{item.fields.description}</td>
                <td>
                   <div className="dropdown">
      <select value={item.fields.status.name} disabled={item.fields.status.name==="Done"}  onChange={event => handleOptionClick(event, item.key)} selectedValue={item.fields.status.name}>
        <option value="select" disabled>Select</option>
        <option value="To Do">To Do</option>
        <option value="Done">Done</option>
      </select>
    </div>
                
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className='row'>
  <div className='col-2'>
    <button className='btn btn-warning btn-block' onClick={() => page(-1)} disabled={currentPage === 1} style={{float:"left"}}>Prev</button>
  </div>
  <div className='col-8'></div>
  <div className='col-2'>
    <button className='btn btn-warning btn-block' onClick={() => page(1)} disabled={data.length < 10} style={{float:'right'}}>Next</button>
  </div>
</div>
 



      </div>
  
  );
}

export default TableComponent;
