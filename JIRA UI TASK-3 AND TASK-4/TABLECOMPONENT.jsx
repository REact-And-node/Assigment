import React, { useState, useEffect } from 'react';
import axios from 'axios';
import http from './httpServer';
function TableComponent() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState(false);

  useEffect(() => {
    // Fetch data from your API here
    // For this example, I'll simulate data fetching with a setTimeout
    const fetchData = async () => {
      try {
        if (data1) {
          // Fetch the first set of data

          
          // Fetch the second set of data
          const response2 = await http.get('/getAllIssues1');
          
        
          console.log(response2);
          
          // Update the state with the fetched data
          setData(response2.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data1]);

  return (
    <div>
      <h2>Data Table</h2>
      <button className='btn btn-warning'onClick={() => setData1(prev=>!prev)}>RE-FETCH</button> 
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
      
    
    </div>
  );
}

export default TableComponent;
