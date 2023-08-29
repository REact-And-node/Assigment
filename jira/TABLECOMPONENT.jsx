import React, { useState, useEffect } from 'react';

import http from './httpServer';
function TableComponent() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
 
  useEffect(() => {
    const fetchData = async () => {
     
         
          const response = await http.get(`/getAllIssuesfromdatabase?page=${currentPage}`);
          setData(response.data);
        
      } 
 

    fetchData();
  }, [currentPage,data1]);
const page=(a)=>{
 
setCurrentPage(currentPage+a)

}
  return (
    <div>
      <h2>Data Table</h2>
      <button className='btn btn-warning'onClick={() => setData1(prev=>!prev,setCurrentPage(1))}>RE-FETCH</button> 
      <br />
      <br />
      <br />
      <div className="row" >
              <div className="col-1 border">ID </div>
              <div className="col-2 border">Name </div>
              <div className="col-2 border">summary </div>
              <div className="col-2 border">reporter </div>
              <div className="col-3 border">description </div>
              <div className="col-2 border">status </div>
            
              </div>
          {data.map(item => (<>
           <div className="row" key={item.id}>
           <div className="col-1 border">{item.id}</div>
               <div className="col-2 border">{item.key} </div>
               <div className="col-2 border">{item.fields.summary} </div>
               <div className="col-2 border">{item.fields.reporter.emailAddress} </div>
               <div className="col-3 border">{item.fields.description} </div>
               <div className="col-2 border">{item.fields.status.name} 
               </div>
               </div>
           </>
          ))}
          <div className='row'>
            <div className='col-2'>
          {currentPage==1?"":  <button className='btn btn-warning'onClick={() => page(-1)}>Prev</button>}
            </div>
            <div className='col-8'>

            </div>
            <div className='col-2'>
{            data.length<10?"":  <button className='btn btn-warning'onClick={() => page(1)}>Next</button> }
            </div>
          </div>
      
    
    </div>
  );
}

export default TableComponent;
